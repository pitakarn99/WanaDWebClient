using Microsoft.VisualBasic.Activities;
using System;
using System.Activities;
using System.Activities.XamlIntegration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xaml;
using System.Xml;

namespace Fs.Core
{
    public static class WorkflowExtensions
    {
        /// <summary>Converts this <see cref="DynamicActivity" /> to an <see cref="ActivityBuilder" /> instance.</summary>
        /// <param name="dynamicActivity">The dynamic activity.</param>
        /// <returns>A new <see cref="ActivityBuilder" /> instance with the settings of this <see cref="DynamicActivity" /></returns>
        public static ActivityBuilder ToActivityBuilder(this DynamicActivity dynamicActivity)
        {
            var activityBuilder = new ActivityBuilder();

            activityBuilder.Implementation = dynamicActivity.Implementation != null ? dynamicActivity.Implementation() : null;
            activityBuilder.Name = dynamicActivity.Name;

            foreach (var item in dynamicActivity.Attributes)
                activityBuilder.Attributes.Add(item);

            foreach (var item in dynamicActivity.Constraints)
                activityBuilder.Constraints.Add(item);

            foreach (var item in dynamicActivity.Properties)
            {
                var property = new DynamicActivityProperty { Name = item.Name, Type = item.Type, Value = null };
                foreach (var attribute in item.Attributes)
                    property.Attributes.Add(attribute);

                activityBuilder.Properties.Add(property);
            }

            VisualBasic.SetSettings(activityBuilder, VisualBasic.GetSettings(dynamicActivity));

            return activityBuilder;
        }

        /// <summary>Converts this <see cref="DynamicActivity" /> to XAML</summary>
        /// <param name="dynamicActivity">The dynamic activity.</param>
        /// <returns>The XAML representing this <see cref="DynamicActivity" /></returns>
        public static string ToXaml(this DynamicActivity dynamicActivity)
        {
            return dynamicActivity.ToActivityBuilder().ToXaml();
        }

        /// <summary>Converts this <see cref="ActivityBuilder" /> to XAML</summary>
        /// <param name="activityBuilder">The activity builder.</param>
        /// <returns>The XAML representing this <see cref="ActivityBuilder" /></returns>
        public static string ToXaml(this ActivityBuilder activityBuilder)
        {
            var stringBuilder = new StringBuilder();
            //var xamlXmlWriter = new XamlXmlWriter(new StringWriter(stringBuilder), new XamlSchemaContext());
            //var builderWriter = ActivityXamlServices.CreateBuilderWriter(xamlXmlWriter);
            XamlSchemaContext xsc = new XamlSchemaContext();
            var builderWriter = ActivityXamlServices.CreateBuilderWriter(
                new IgnorableXamlXmlWriter(new StringWriter(stringBuilder), xsc));

            XamlServices.Save(builderWriter, activityBuilder);
            return stringBuilder.ToString();
        }

        /// <summary>Converts the XAML in the provided <see cref="Stream" /> to a dynamic activity.</summary>
        /// <param name="stream">The <see cref="Stream" /> that contains the XAML.</param>
        /// <returns>An instance of <see cref="DynamicActivity" /> based on the XAML in the supplied <see cref="Stream" /> .</returns>
        public static DynamicActivity XamlToDynamicActivity(Stream stream)
        {
            using (var streamReader = new StreamReader(stream))
            {
                return XamlToDynamicActivity(streamReader);
            }
        }

        /// <summary>Converts the XAML in the provided <see cref="TextReader" /> to a dynamic activity.</summary>
        /// <param name="reader">The <see cref="TextReader" /> that contains the XAML.</param>
        /// <returns>An instance of <see cref="DynamicActivity" /> based on the XAML in the supplied <see cref="TextReader" /> .</returns>
        public static DynamicActivity XamlToDynamicActivity(TextReader reader)
        {
            var activity = ActivityXamlServices.Load(reader) as DynamicActivity;
            if (activity == null)
                throw new InvalidDataException("The XAML doesn't represent a DynamicActivity.");
            return activity;
        }

        /// <summary>Converts the provided XAML to a dynamic activity.</summary>
        /// <param name="xaml">The xaml.</param>
        /// <returns>An instance of <see cref="DynamicActivity" /> based on the supplied XAML.</returns>
        public static DynamicActivity XamlToDynamicActivity(string xaml)
        {
            return XamlToDynamicActivity(new StringReader(xaml));
        }
    }

    public class IgnorableXamlXmlWriter : XamlXmlWriter
    {

        HashSet<NamespaceDeclaration> ignorableNamespaces = new HashSet<NamespaceDeclaration>();
        HashSet<NamespaceDeclaration> allNamespaces = new HashSet<NamespaceDeclaration>();
        bool objectWritten;
        bool hasDesignNamespace;
        string designNamespacePrefix;

        public IgnorableXamlXmlWriter(TextWriter tw, XamlSchemaContext context)
            : base(XmlWriter.Create(tw,
                                    new XmlWriterSettings { Indent = true, OmitXmlDeclaration = true }),
                                    context,
                                    new XamlXmlWriterSettings { AssumeValidInput = true })
        {

        }

        public override void WriteNamespace(NamespaceDeclaration namespaceDeclaration)
        {
            if (!objectWritten)
            {
                allNamespaces.Add(namespaceDeclaration);
                // if we find one, add that to ignorable namespaces
                // the goal here is to collect all of them that might point to this
                // if you had a broader set of things to ignore, you would collect 
                // those here.
                if (namespaceDeclaration.Namespace == "http://schemas.microsoft.com/netfx/2009/xaml/activities/presentation")
                {
                    hasDesignNamespace = true;
                    designNamespacePrefix = namespaceDeclaration.Prefix;
                }
            }
            base.WriteNamespace(namespaceDeclaration);
        }

        public override void WriteStartObject(XamlType type)
        {
            if (!objectWritten)
            {
                // we should check if we should ignore 
                if (hasDesignNamespace)
                {
                    // note this is not robust as mc could naturally occur
                    string mcAlias = "mc";
                    this.WriteNamespace(
                        new NamespaceDeclaration(
                            "http://schemas.openxmlformats.org/markup-compatibility/2006",
                            mcAlias)
                            );

                }
            }
            base.WriteStartObject(type);
            if (!objectWritten)
            {
                if (hasDesignNamespace)
                {
                    XamlDirective ig = new XamlDirective(
                        "http://schemas.openxmlformats.org/markup-compatibility/2006",
                        "Ignorable");
                    WriteStartMember(ig);
                    WriteValue(designNamespacePrefix);
                    WriteEndMember();
                    objectWritten = true;
                }
            }
        }

    }
}
