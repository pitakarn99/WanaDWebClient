/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import $ from "jquery";

export class fs {
  static get Config(): FsConfig {
    return window["_config"];
  }
  static set Config(config: FsConfig) {
    window["_config"] = config;
  }

  static async InitConfig() {
      const configFile = require("Config/FsConfig.json");
      var response = await fetch(configFile.default);
      var result = await response.json();
      console.log('JSON loaded via fetch', result);
      this.Config = $.extend(this.Config, result.Config);
  }
}

export class FsConfig {
  ServiceBaseUrl: string;
  ClientBaseUrl: string;
  UserDetailUrl: string;
  UserGroupDetailUrl: string;
  YearOffset: number;
  EnableManualCheckSession: boolean = false;

    IsShowPasswordRequirements: boolean = false;
}
