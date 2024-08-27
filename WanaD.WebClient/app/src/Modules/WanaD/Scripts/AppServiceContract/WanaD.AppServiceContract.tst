${
    using Typewriter.Extensions.Types;
    using Typewriter.Extensions.WebApi;

        // Uncomment the constructor to change template settings.
    Template(Settings settings)
    {
        //settings.IncludeProject("Project.Name");
        //settings.OutputExtension = ".tsx";
        
        settings.OutputFilenameFactory = file => System.IO.Path.ChangeExtension(RenameControllerToService(file.Name), settings.OutputExtension);
    }
 
    // Custom extension methods can be used in the template by adding a $ prefix
    string ReturnType(Method m) => m.Type.Name == "IHttpActionResult" ? "void" : m.Type.Name;
    string RenameControllerToService(string name){
        string className = name.Replace("Controller", "AppService");
        
        if(className.Contains("AppService") && className.StartsWith("I"))
        {
            int startIndex = className.IndexOf("I") + 1;
            className = className.Substring(startIndex);
        }

        return className;
    } //=> name.Replace("Controller", "Service");
    string RenameNamespaceToModule(string name)
    {
        string module = name.Replace("Controller", "");
        
        if(module.StartsWith("WanaD"))
        {
            int startIndex = module.IndexOf("WanaD");
            module = module.Substring(startIndex);
        }

        return module;
    }
    string ServiceName(Interface c) => RenameControllerToService(c.Name);
    string ParentServiceName(Method m) => ServiceName((Interface)m.Parent);
    string ParentServiceNamespace(Method m) => RenameNamespaceToModule(((Interface)m.Parent).Namespace);
    string OptionFormat(Method p) => p.Parameters.Count > 0 ? "options : JQueryAjaxSettings," : "options : JQueryAjaxSettings";
    string DataFormat(Method p) => p.Parameters.Count == 0 ? "null": 
        "JSON.stringify(" + p.Parameters[0] + ")"; 
 
    Type[] CalculatedModelTypes(Class c)
    {
        // Method
        var allMethodTypes = c.Methods
            .SelectMany(m => m.Parameters.Select(p => p.Type).Concat(new [] { m.Type }))
            .Select(t => CalculatedType(t))
            .Where(t => t != null && t.Name != "void" && !t.IsPrimitive && t.Name != "any" && t.Name != "object")
            .ToLookup(t => t.ClassName(), t => t)
            .ToDictionary(l => l.Key, l => l.First()).Select(kvp => kvp.Value).ToArray();
 
        // Properties
        var allPropertyTypes = c.Properties.Where(t => !t.Type.IsPrimitive && !t.Type.IsEnum && !t.Type.IsEnumerable && t.Type.Name != "any").Select(t => t.Type).ToArray();
 
        return allMethodTypes.Concat(allPropertyTypes).Where(t => t.Name != c.Name).GroupBy(t => t.Name).Select(t => t.FirstOrDefault()).ToArray();
    }
    Type[] CalculatedModelTypes2(Interface c)
    {
        // Method
        var allMethodTypes = c.Methods
            .SelectMany(m => m.Parameters.Select(p => p.Type).Concat(new [] { m.Type }))
            .Select(t => CalculatedType(t))
            .Where(t => t != null && t.Name != "void" && !t.IsPrimitive && t.Name != "any" && t.Name != "object")
            .ToLookup(t => t.ClassName(), t => t)
            .ToDictionary(l => l.Key, l => l.First()).Select(kvp => kvp.Value).ToArray();
 
        // Properties
        var allPropertyTypes = c.Properties.Where(t => !t.Type.IsPrimitive && !t.Type.IsEnum && !t.Type.IsEnumerable && t.Type.Name != "any").Select(t => t.Type).ToArray();
 
        return allMethodTypes.Concat(allPropertyTypes).Where(t => t.Name != c.Name).GroupBy(t => t.Name).Select(t => t.FirstOrDefault()).ToArray();
    }
    Type CalculatedType(Type t)
    {
        var type = t;
        while (!type.IsEnumerable && type.IsGeneric) {
            type = type.Unwrap();
        }
        return type.Name == "IHttpActionResult" ? null : type;
    }
    string CheckEnum(Property t){
        if(t.Type.IsEnum || t.Type.IsEnumerable)
            return "any";
        else
            return t.Type.Name;
    }
    string CheckNameSpace(Type type){
 
        if(type.IsGeneric){
            type = type.TypeArguments.FirstOrDefault();            
        }
 
        return CheckNameSpace(type.Namespace);
    }
    string CheckNameSpace(Class c){
        return CheckNameSpace(c.Namespace);
    }
    string CheckNameSpace(Interface c){
        return c.Namespace;
    }
    string CheckNameSpace(string name){
        if (name.StartsWith("Fs.Erp."))
        {
            int startIndex = name.IndexOf("Fs.Erp.") + 7;
            string cut1 = name.Substring(startIndex);
            int endLength = cut1.IndexOf(".");
            string moduleName = "";
            string leftNamespace = "";
            if(endLength == -1)
            {
                moduleName = name.Substring(startIndex);
            }
            else
            {
                moduleName = name.Substring(startIndex, endLength);
                leftNamespace = name.Substring(startIndex + endLength);
            }
 
            return "Modules/" + moduleName + "/Scripts" + leftNamespace.Replace(".", "/");
        }
        else if(name.StartsWith("Fs.Core")){
            //string leftNamespace = name.Replace("Fs.Core", "");
            return "Lib/Fs.Core.Data";;
        }
        else 
       
        
        {
            var splitedNames = name.Split('.');
            string moduleName = splitedNames[0];
            string leftNamespace = string.Empty;
            for(var i = 1; i < splitedNames.Length; i++){
                leftNamespace += "/" + splitedNames[i];
            }
            
            return "Modules/" + moduleName + "/Scripts" + leftNamespace.Replace(".", "/");
        }
    }

    string CheckNameSpaceController(Interface c){
        return CheckNameSpaceController(c.Namespace);
    }

        string CheckNameSpaceController(string name){

        name = name.Replace("Contract", "");

        if (name.StartsWith("Fs.Erp."))
        {
            int startIndex = name.IndexOf("Fs.Erp.") + 7;
            string moduleName = name.Substring(startIndex);
 
            return "modules/" + moduleName;
        }
        else if(name.StartsWith("WanaD")){
            int startIndex = name.IndexOf("WanaD");
            string moduleName = name.Substring(startIndex);
            return "modules/" + moduleName;
        }
        else
        {
            var splitedNames = name.Split('.');
            string moduleName = splitedNames[0];
            string leftNamespace = string.Empty;
            for(var i = 1; i < splitedNames.Length; i++){
                leftNamespace += "/" + splitedNames[i];
            }
            
            return "modules/" + moduleName;
        }
    }

}
 
$Classes(c => c.Namespace == "WanaD.AppServiceContract")[
 
$BaseClass[
    import $Name from "$CheckNameSpace/$Name";
]
 
$CalculatedModelTypes[
    import $ClassName from '$CheckNameSpace/$ClassName';
]
 
class $Name $BaseClass[extends $Name]
{
    $Properties[
        $Name: $CheckEnum;
    ]
}
 
export default $Name;
 
]

$Interfaces(c => c.Namespace == "WanaD.AppServiceContract")[
 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 $CalculatedModelTypes2[
    import $ClassName from '$CheckNameSpace/$ClassName';
]

    //module $ServiceName {
    

    class $ServiceName {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "$CheckNameSpaceController/$ServiceName" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "$CheckNameSpaceController/$ServiceName" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    $Methods[
    // $HttpMethod: $Url
    //public static Route$Name = ($Parameters(p => p.Type.IsPrimitive)[$name: $Type][, ]) => this.ServiceUrl + `modules/$ParentServiceNamespace/$ParentServiceName/$Name`;
    public Route$Name($Parameters(p => p.Type.IsPrimitive)[$name: $Type][, ]) : string {
        return this.ControllerUrl + "/"+"$Name";
    }
    public $Name($Parameters[$name: $Type][, ]): JQuery.jqXHR<$ReturnType> {
        return $.ajax({
                url: this.Route$Name($Parameters(p => p.Type.IsPrimitive)[$name][, ]),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: '$HttpMethod',
                data: $DataFormat,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    ]
}

export default $ServiceName;

]

