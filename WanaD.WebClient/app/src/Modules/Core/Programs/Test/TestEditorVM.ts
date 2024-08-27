import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";

import TestData from "../../Scripts/AppServiceContract/TestData";
import TestAppService from "../../Scripts/AppServiceContract/TestAppService";
import TestSearchVM from "./Test";
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";

export default class TestEditorVM extends EditorVMBase {
  Id: string;
  Code: string;
  Name: string;
  Price: number;
  TestAppService: TestAppService;

  constructor() {
    super();

    this.ValidationRules.on(this)
      .ensure("Code")
      .required()
      .withMessage("Code is required.")
      .ensure("Name")
      .required()
      .withMessage("Name is required.");
  }
  attached() {}
  async LoadOriginalSourceAsync(originalSource: TestData) {
    this.Id = originalSource.Id;
    this.Code = originalSource.Code;
    this.Name = originalSource.Name;
    this.Price = originalSource.Price;
  }

  async SaveOriginalSourceAsync(originalSource: TestData) {
    originalSource.Id = $.trim(this.Id);
    originalSource.Code = $.trim(this.Code);
    originalSource.Name = $.trim(this.Name);
    originalSource.Price = this.Price;
  }

  async SaveAsync(
    doneCallback: () => void,
    failCallback: (error: any) => void
  ) {
    var self = this;

    var service = this.container.get(TestAppService) as TestAppService;

    if (this.HasOriginalSource) {
      var request = this.CreateRequest();
      service
        .Update(request)
        .done((result) => {
          FsUtility.AlertModal("The item has been updated successfully", 2, 1);
          self.Id = result;

          doneCallback();
        })
        .fail((error) => {
            FsUtility.CommonErrorHandler(error);
        });
    } else {
      var request = this.CreateRequest2();
      service
        .Add(request)
        .done((result) => {
          FsUtility.AlertModal("The item has been updated successfully", 2, 1);
          self.Id = result;
          doneCallback();
        })
        .fail((error) => {
            FsUtility.CommonErrorHandler(error);
        });
    }
  }

  CreateRequest(): TestData {
    var request = new TestData();
    request.Id = $.trim(this.Id);
    request.Code = $.trim(this.Code);
    request.Name = $.trim(this.Name);
    request.Price = this.Price;
    return request;
  }
  CreateRequest2(): TestData {
    var request = new TestData();
    request.Code = $.trim(this.Code);
    request.Name = $.trim(this.Name);
    request.Price = this.Price;
    return request;
  }

  async RemoveAsync(searchVM: TestSearchVM, removeCallback: () => void) {
    var self = this;

    var service = this.container.get(TestAppService) as TestAppService;

    FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, (result) => {
      if (result) {
        service
          .Remove(self.Id)
          .done((result) => {
            FsUtility.AlertModal(
              "The item has been updated successfully",
              2,
              1
            );
            if (removeCallback != null) removeCallback();
          })
          .fail((error) => {
              FsUtility.CommonErrorHandler(error);
          });
      }
    });
  }
}
