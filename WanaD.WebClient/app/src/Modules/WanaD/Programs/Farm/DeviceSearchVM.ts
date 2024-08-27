/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import template from './DeviceView.html';
import { customElement, resolve, transient } from 'aurelia';
import DeviceEditorVM from "./DeviceEditorVM";
import DeviceSearchCriteria from "../../Scripts/AppServiceContract/DeviceSearchCriteria";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import { IDialogService } from "@aurelia/dialog";
import GeneralPopupEditDialog from "../../../../Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";
import PlotDeviceData from "../../Scripts/AppServiceContract/PlotDeviceData";
import PlotDeviceParameter from "../../Scripts/AppServiceContract/PlotDeviceParameter";
import DeviceData from "../../Scripts/AppServiceContract/DeviceData";

@customElement({
    name: 'DeviceView',
    template
})
@transient



export default class DeviceSearchVM extends SearchVMBase2<DeviceEditorVM, DeviceSearchCriteria>{
    Id: string;
    FarmId: string;
    LandOwner: string;
    Latitude: number;
    Longitude: number;
    BankId: string;
    BankAccNumber: string;
    BankAccHolder: string;
    Area: string;
    DeviceNo: string;
    ValidationController = resolve(newInstanceForScope(IValidationController)) as IValidationController;
    router: IRouter = resolve(IRouter)

    dialogService: IDialogService = resolve(IDialogService);

    constructor() {
        super(DeviceEditorVM);
    }

    Load(farmId) {
        //debugger
        var self = this;
        self.FarmId = farmId;
        self.SearchAsync();
        self.FindMasterDevice();
    }

    async SearchItemsAsync(searchCallback: (result: PlotDeviceData[]) => void, searchCriteria: DeviceSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        //const self = this;
        //debugger
        const service = this.container.get(FarmAppService) as FarmAppService;
        const criteria = new PlotDeviceParameter();
        criteria.Criteria = this.CreateCriteria();
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindPlotDeviceAsync(criteria) as PlotDeviceData[];
            searchCallback(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    PrepareDefaultSortingCriteria(sortingCriteria: SortingCriteria) {
        const sortBy = new SortBy();
        sortBy.Direction = 0;
        sortBy.Name = "PlotId";
        sortingCriteria.push(sortBy);
    }

    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();
        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.PlotDeviceCount(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): DeviceSearchCriteria {
        const cri = new DeviceSearchCriteria();
        cri.DeviceNo = this.DeviceNo == null ? "" : this.DeviceNo.trim();
        cri.FarmId = this.FarmId;
        return cri;
    }

    async RemoveCommandAsync(editorVM: DeviceEditorVM) {
        await super.RemoveCommandAsync(editorVM);
    }

    async ClearAsync(): Promise<void> {
        this.DeviceNo = null;
        await this.SearchAsync();
    }

    async ViewData(editorVM) {
        //debugger
        const self = this;
        const text = await import("./DeviceDialogView.html");
        editorVM.Parent = self;
        editorVM.FarmId = this.FarmId;
        this.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal modal-lg",
                    Header: "Device Information",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {
                //debugger
                if (response.status === "ok") {
                    const res = response.value as DeviceEditorVM;
                    self.SearchAsync();
                }
                else {
                    await editorVM.EndEditAsync();
                    if (editorVM.HasOriginalSource)
                        await editorVM.LoadOriginalSourceAsync(editorVM.OriginalSource);
                }
            });
    }

    async AddDevice() {
        const self = this;
        const editorVM = await this.CreateNewItemAsync();
        const text = await import("./DeviceDialogView.html");
        editorVM.FarmId = self.FarmId;
        this.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal modal-lg",
                    Header: "Add Device",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {
                //debugger
                if (response.status === "ok") {
                    const res = response.value as DeviceEditorVM;
                    self.SearchAsync();
                }
                else {
                    await this.RemoveCommandAsync(editorVM);
                }
            });
    }

    //PlotNameDatas: any;
    //async FindPlotName(id: string) {
    //    //debugger
    //    const service = this.container.get(FarmAppService) as FarmAppService;
    //    try {
    //        const result = await service.FindPlotNameAsync(id) as PlotData[];
    //        this.PlotNameDatas = result;
    //    }
    //    catch (error) {
    //        FsUtility.CommonErrorHandler(error);
    //    }
    //}

    DeviceMasterDatas: any;
    async FindMasterDevice() {

        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.FindMasterDeviceAsync() as DeviceData[];
            this.DeviceMasterDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }






}
