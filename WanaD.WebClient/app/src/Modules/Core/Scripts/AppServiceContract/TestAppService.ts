import { fs } from "Config/FsConfig";

import TestCriteria from "../AppServiceContract/TestCriteria";

import TestParameter from "../AppServiceContract/TestParameter";

import TestData from "../AppServiceContract/TestData";

class TestAppService {
  ControllerUrl: string;
  Options: JQueryAjaxSettings;

  constructor(
    serverBaseUrl: string = null,
    controllerPath: string = null,
    ajaxOptions: JQueryAjaxSettings = null
  ) {
    this.ControllerUrl =
      (serverBaseUrl == null ? fs.Config.ServiceBaseUrl : serverBaseUrl) +
      (controllerPath == null
        ? "modules/FsAurelia/TestAppService"
        : controllerPath);
    this.Options = ajaxOptions;
  }

  public Init(
    options: any = {
      serverBaseUrl: null,
      controllerPath: null,
      ajaxOptions: null,
    }
  ) {
    this.ControllerUrl =
      (options.serverBaseUrl == null
        ? fs.Config.ServiceBaseUrl
        : options.serverBaseUrl) +
      (options.controllerPath == null
        ? "modules/FsAurelia/TestAppService"
        : options.controllerPath);
    this.Options = options.ajaxOptions;

    return this;
  }

  // post: api/${controller}/
  public RouteCount(): string {
    return this.ControllerUrl + "/" + "CountAsync";
  }
  public Count(searchCriteria: TestCriteria): JQuery.jqXHR<number> {
    return $.ajax({
      url: this.RouteCount(),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify(searchCriteria),
      async:
        this.Options == null || this.Options.async == null
          ? true
          : this.Options.async,
    });
  }

  // post: api/${controller}/
  public RouteFind(): string {
    return this.ControllerUrl + "/" + "FindAsync";
  }
  public Find(testParameter: TestParameter): JQuery.jqXHR<TestData[]> {
    return $.ajax({
      url: this.RouteFind(),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify(testParameter),
      async:
        this.Options == null || this.Options.async == null
          ? true
          : this.Options.async,
    });
  }

  // post: api/${controller}/
  public RouteAdd(): string {
    return this.ControllerUrl + "/" + "AddAsync";
  }
  public Add(data: TestData): JQuery.jqXHR<string> {
    return $.ajax({
      url: this.RouteAdd(),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify(data),
      async:
        this.Options == null || this.Options.async == null
          ? true
          : this.Options.async,
    });
  }

  // post: api/${controller}/
  public RouteUpdate(): string {
    return this.ControllerUrl + "/" + "UpdateAsync";
  }
  public Update(data: TestData): JQuery.jqXHR<string> {
    return $.ajax({
      url: this.RouteUpdate(),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify(data),
      async:
        this.Options == null || this.Options.async == null
          ? true
          : this.Options.async,
    });
  }

  // post: api/${controller}/${encodeURIComponent(id)}
  public RouteRemove(id: string): string {
    return this.ControllerUrl + "/" + "RemoveAsync";
  }
  public Remove(id: string): JQuery.jqXHR<void> {
    return $.ajax({
      url: this.RouteRemove(id),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify(id),
      async:
        this.Options == null || this.Options.async == null
          ? true
          : this.Options.async,
    });
  }
}

export default TestAppService;
