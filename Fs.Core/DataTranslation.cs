using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Fs.Core
{
    public class TranslationField : Attribute
    {
        public TranslationField(string displayName)
        {
            DisplayName = displayName;
            AllowMultiLine = false;
            IsRequire = false;
        }
        public TranslationField(string displayName, bool isRequire, bool allowMultiLine)
        {
            DisplayName = displayName;
            AllowMultiLine = allowMultiLine;
            IsRequire = isRequire;
        }
        public TranslationField(Type resourceType, string resourceKey)
        {
            DisplayName = GetResourceLookup(resourceType, resourceKey);
            this.resourceType = resourceType;
            this.resourceKey = resourceKey;
            AllowMultiLine = false;
            IsRequire = false;
        }
        public TranslationField(Type resourceType, string resourceKey, bool isRequire, bool allowMultiLine)
        {
            DisplayName = GetResourceLookup(resourceType, resourceKey);
            this.resourceType = resourceType;
            this.resourceKey = resourceKey;
            AllowMultiLine = allowMultiLine;
            IsRequire = isRequire;
        }
        public string DisplayName { get; set; }
        public bool AllowMultiLine { get; set; }
        public bool IsRequire { get; set; }
        private Type resourceType;
        private string resourceKey;
        public static string GetResourceLookup(Type resourceType, string resourceName)
        {
            ResourceManager resourceManager = new ResourceManager(resourceType);
            return resourceManager.GetString(resourceName);
        }
        public string GetDisplayName(string languageCode)
        {
            if (resourceType == null || string.IsNullOrEmpty(resourceKey))
                return DisplayName;
            ResourceManager resourceManager = new ResourceManager(resourceType);
            return resourceManager.GetString(resourceKey, new CultureInfo(languageCode));
        }

    }
    public class TranslationCollection : Attribute
    {
        public TranslationCollection(Type translationType)
        {
            if (!translationType.GetInterfaces().Contains(typeof(ITranslateObject)))
                throw new NotSupportedException(translationType.FullName + " is not translate object.");
            TranslationType = translationType;
        }
        public Type TranslationType { get; set; }
    }
    public class ReferenceTranslationField : Attribute
    {
        public ReferenceTranslationField(Type translationType, string referncePropertyName)
        {
            if (!translationType.GetInterfaces().Contains(typeof(ITranslateObject)))
                throw new NotSupportedException(translationType.FullName + " is not translate object.");
            TranslationType = translationType;
            ReferncePropertyName = referncePropertyName;
        }
        public Type TranslationType { get; set; }
        public string ReferncePropertyName { get; set; }
    }
    public interface ITranslateObject
    {
        string LanguageCode { get; set; }
    }
    public static class ValueExtension
    {
        public static object GetValueFromPath(this object obj, string path)
        {
            if (obj == null) return null;
            if (string.IsNullOrEmpty(path)) return obj;
            var props = path.Split('.');
            Type instance = obj.GetType();
            foreach (var prop in props)
            {
                var propInfo = instance.GetProperty(prop);
                if (propInfo != null)
                {
                    obj = propInfo.GetValue(obj, null);
                    instance = propInfo.PropertyType;
                }
                else
                {
                    throw new ArgumentException("Properties path is not correct");
                }
            }
            return obj;
        }
        public static TResult GetValueFromPath<TResult>(this object obj, string path)
        {
            return (TResult)GetValueFromPath(obj, path);
        }
    }
    public static class DataTranslation
    {
        /// <summary>
        /// ใช้เซ็ตค่าจาก Translate Collection ไปยัง Class แม่ เช่น ProductData มี ProductTranslatData เป็น Collection อยู่ จะเอาค่าจาก ProductTranslateData มาเซ็ตให้กับ ProductData ที่ถูก Map Property ไว้ 
        /// </summary>
        /// <param name="data"></param>
        public static void TranslateData(object data)
        {
            var languageCode = Thread.CurrentThread.CurrentUICulture.Clone().ToString();
            TranslateData(data, languageCode);
        }
        /// <summary>
        /// ใช้เซ็ตค่าจาก Translate Collection ไปยัง Class แม่ เช่น ProductData มี ProductTranslatData เป็น Collection อยู่ จะเอาค่าจาก ProductTranslateData มาเซ็ตให้กับ ProductData ที่ถูก Map Property ไว้ 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="languageCode"></param>
        public static void TranslateData(object data, string languageCode)
        {
            var translatesProps = data.GetType().GetProperties().Where(t => t.GetCustomAttribute<TranslationCollection>() != null).Select(t => new { PropName = t.Name, TranslationType = t.GetCustomAttribute<TranslationCollection>().TranslationType }).ToList();
            foreach (var translatesProp in translatesProps)
            {
                var translates = data.GetValueFromPath(translatesProp.PropName) as IEnumerable<ITranslateObject>;
                if (translates == null || translates.Count() == 0)
                    continue;

                translates = translates.ToList();
                var current = translates.Where(t => t.LanguageCode == languageCode).FirstOrDefault();
                var properties = data.GetType().GetProperties().Where(t => t.GetCustomAttribute<ReferenceTranslationField>() != null).Select(t => new { PropInfo = t, RefField = t.GetCustomAttribute<ReferenceTranslationField>() })
                                .Where(t => t.RefField.TranslationType.Equals(translatesProp.TranslationType)).ToList();
                if (current != null)
                {
                    foreach (var property in properties)
                    {
                        property.PropInfo.SetValue(data, data.GetValueFromPath(property.RefField.ReferncePropertyName));
                    }
                }
                else
                {
                    foreach (var property in properties)
                    {
                        property.PropInfo.SetValue(data, property.PropInfo.PropertyType.IsValueType ? Activator.CreateInstance(property.PropInfo.PropertyType) : null);
                    }
                }
            }
        }
    }
}
