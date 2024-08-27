import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import UserData01 from "../../../Core/Scripts/AppServiceContract/UserData01";
import ManageUserGroupMemberSearchParameter from "../../Scripts/AppServiceContract/ManageUserGroupMemberSearchParameter";
import UserCriteria01 from "../../../Core/Scripts/UserCriteria01";

import { IRouter } from "@aurelia/router";
import template from './ManageInternalUserSearchView.html';
import { customElement, resolve } from 'aurelia';
import ManageInternalUserEditorVM from "./ManageInternalUserEditorVM";
import DetailModalVM from "../../../Core/Components/Modal/DetailModalVM";
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";

@customElement({
    name: 'ManageInternalUserSearchView',
    template
})
export default class ManageInternalUserSearchVM extends SearchVMBase2<ManageInternalUserEditorVM, UserCriteria01>{
    Code: string;
    Name: string;
    IsActive: boolean;
    IsActiveList: [];
    IsLocked: boolean;
    IsLockedList: [];
    DefaultGroupCode: string;
    ItemsProvider: any;
    template: any;
    importmodel: DetailModalVM = new DetailModalVM();
    router: IRouter = resolve(IRouter)

    constructor() {
        super(ManageInternalUserEditorVM);
        const self = this;
        
        this.IsSearchAfterSave = true;
        this.IsClearSelectionAfterSave = true;

        new Promise(async () => {
            await this.SearchAsync();
        });

    }

    async SearchItemsAsync(searchCallback: (result: UserData01[]) => void, searchCriteria: UserCriteria01, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;
        const service = this.container.get(ManageUserAppService) as ManageUserAppService;

        const criteria = new ManageUserGroupMemberSearchParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindInternalUserAsync(criteria) as UserData01[];
            searchCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    PrepareDefaultSortingCriteria(sortingCriteria: SortingCriteria) {
        const sortBy = new SortBy();
        sortBy.Direction = 0;
        sortBy.Name = "Name";
        sortingCriteria.push(sortBy);
    }

    async CountItemsAsync(countCallback: (result: number) => void) {
        const self = this;
        const req = self.CreateCriteria();

        const service = this.container.get(ManageUserAppService) as ManageUserAppService;

        try {
            const result = await service.CountAsync(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): UserCriteria01 {
        const cri = new UserCriteria01();
        cri.Name = this.Name == null ? null : this.Name.trim();
        cri.IsGroup = false;
        return cri;
    }

    async RemoveCommandAsync(editorVM: ManageInternalUserEditorVM) {
        await super.RemoveCommandAsync(editorVM);
    }

    async ClearAsync(): Promise<void> {
        this.Code = null;
        this.Name = null;
        this.IsActive = null;
        await this.SearchAsync();
    }

    AddCommand() {
        this.router.load("Modules/WanaD/InternalUserDetailPage/");
    }

    InitializeLoadingItem(editorVM: ManageInternalUserEditorVM) {
        editorVM.router = this.router;
    }

}
