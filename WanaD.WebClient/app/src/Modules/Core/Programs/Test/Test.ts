/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
import { IRouteableComponent } from "@aurelia/router";
import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "../../../../Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "../../../../Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "../../../../Lib/Fs.Core.Data/SortBy";
import ManageUserEditorVM from "./TestEditorVM";
import TestEditorVM from "./TestEditorVM";
import SearchVMBase from "Lib/Fs.SmartClient.Client/SearchVMBase";
import TestData from "../../Scripts/AppServiceContract/TestData";
import TestParameter from "../../Scripts/AppServiceContract/TestParameter";
import TestAppService from "../../Scripts/AppServiceContract/TestAppService";
import TestCriteria from "../../Scripts/AppServiceContract/TestCriteria";
import { DI, IContainer, resolve } from "aurelia";
import { IDialogService } from "@aurelia/dialog";
import GeneralPopupEditDialog from "../../../../Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";
import { newInstanceForScope } from "@aurelia/kernel";
import { IValidationRules } from "@aurelia/validation";
import { IValidationController } from "@aurelia/validation-html";
import { watch } from "@aurelia/runtime-html";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";

export default class Test extends SearchVMBase2<TestEditorVM, TestCriteria> {
  public Name: string;
  public numbertest: number;
  public Code: string;
  // validationRules;
  testselect2List: any = [
    { Id: "1", Name: "test1" },
    { Id: "2", Name: "test2" },
    { Id: "3", Name: "test3" },
    { Id: "4", Name: "test4" },
    { Id: "5", Name: "test5" },
    { Id: "6", Name: "test6" },
    { Id: "7", Name: "test7" },
    { Id: "8", Name: "test8" },
    { Id: "9", Name: "test9" },
    { Id: "10", Name: "test10" },
    { Id: "11", Name: "test11" },
    { Id: "12", Name: "test12" },
  ];

  testselect2value: string;
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;
    ValidationRules = resolve(IValidationRules) as IValidationRules;
    static inject = [IDialogService];
    dialogService:any
  constructor(dialogService    
  ) {
      
      super(TestEditorVM);
      this.dialogService = dialogService;
    this.SearchAsync();
  }

  async SearchItemsAsync(
    searchCallback: (result: any[]) => void,
    searchCriteria: TestCriteria,
    sortingCriteria: SortingCriteria,
    pagingCriteria: PagingCriteria
  ) {
    var self = this;
    var criteria = new TestParameter();
    criteria.SearchCriteria = searchCriteria;
    criteria.SortingCriteria = sortingCriteria;
    criteria.PagingCriteria = pagingCriteria;

    var service = self.container.get(TestAppService) as TestAppService;
    service
      .Find(criteria)
      .done((result) => {
        searchCallback(result);
      })
      .fail((error) => {
        FsUtility.CommonErrorHandler(error);
      });
  }
  CreateCriteria(): TestCriteria {
    var self = this;
    var criteria = new TestCriteria();
    criteria.Name = self.Name;
    criteria.Code = self.Code;
    return criteria;
  }
  async CountItemsAsync(countCallback: (result: number) => void) {
    var self = this;
    var service = this.container.get(TestAppService) as TestAppService;
    try {
      var result = await service.Count(this.SearchCriteria);

      countCallback(result);
    } catch (error) {
        FsUtility.CommonErrorHandler(error);
    }
  }

  async View(editorVM: TestEditorVM) {
    editorVM.IsEditing = true;

    var text = await import("./TestEditorDialogView.html");
    this.dialogService
      .open({
        component: () => GeneralPopupEditDialog,
        model: {
          view: text.default,
          viewModel: editorVM,
          Header: "Test Edit",
          btnclass: "btn btn-pill  btn-white btn-medium",
        },
        lock: false,
      })
      .whenClosed((response) => {
        if (response.status === "ok") {
          var res = <{ valueFromDialog: string }>response.value;
        }
      });
  }

  async CreateNewItem2() {
    var editorVM = await this.CreateNewItemAsync();

    var text = await import("./TestEditorDialogView.html");
    this.dialogService
      .open({
        component: () => GeneralPopupEditDialog,
        model: {
          view: text.default,
          viewModel: editorVM,
          Header: "Test Edit",
          btnclass: "btn btn-pill  btn-white btn-medium",
        },
        lock: false,
      })
      .whenClosed(async (response) => {
        if (response.status === "ok") {
          var res = response.value;
        } else {
          await this.RemoveCommandAsync(editorVM);
        }
      });
  }
}
