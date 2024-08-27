/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import FarmData from "../../Scripts/AppServiceContract/FarmData";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import { IValidationController } from "@aurelia/validation-html";
import { Tile as TileLayer } from "ol/layer";
import { OSM, XYZ } from "ol/source";
import View from "ol/View";
import { fromLonLat, transform } from "ol/proj";
import Map from "ol/Map";
import { Overlay } from "ol";
import { DragPan } from "ol/interaction";
import ResponsiblePersonSearchVM from "./ResponsiblePersonSearchVM";
import PlotSearchVM from "./PlotSearchVM";
import DeviceSearchVM from "./DeviceSearchVM";
import ReligionData from "../../Scripts/AppServiceContract/ReligionData";
import EthnicityData from "../../Scripts/AppServiceContract/EthnicityData";
import { newInstanceForScope } from "@aurelia/kernel";
import { DialogService, IDialogService } from "@aurelia/dialog";
import * as utm from 'utm';
import template from './FarmDetailView.html';
import { customElement, resolve } from 'aurelia';

@customElement({
    name: 'FarmDetailView',
    template
})
export default class FarmDetailEditorVM extends EditorVMBase {
    Id: string;
    Name: string;
    OwnerName: string;
    Latitude: number;
    Longitude: number;
    Address: string;
    DateOfBirth: Date;
    SelectedReligion: string;
    SelectedEthnicity: string;
    PhoneNumber: string;
    IDNumber: string;
    Gender: number;
    IsThaiNationality: boolean;

    ReligionId: string;
    EthnicityId: string;
    FarmId: string;
    static inject = [IDialogService];
    dialogService: any;
    PlotSearchVM: PlotSearchVM;
    DeviceSearchVM: DeviceSearchVM;
    ResponsiblePersonSearchVM: ResponsiblePersonSearchVM;
    IsCreate: boolean;
    router: IRouter = resolve(IRouter)


    attached() {
        this.LoadMap();
    }
    ValidationController = resolve(IValidationController) as IValidationController;

    constructor(dialogService) {
        super();
        this.dialogService = dialogService;
        this.ValidationRules.on(this)
            .ensure('Name').required().withMessage('Name is required.')
            .ensure('LatLongName').required().withMessage('Location is required.')
            .ensure('OwnerName').required().withMessage('Owner Name is required.')
            .ensure('DateOfBirth').required().withMessage('Date of Birth is required.')
            .ensure('ReligionId').required().withMessage('Religion is required.')
            .ensure('EthnicityId').required().withMessage('Ethnicity is required.')
            .ensure('PhoneNumber').required().withMessage('Phone No is required.')
            .ensure('IDNumber').required().when(t => !t.IsThaiNationality).withMessage('ID Number is required.')
            .ensure('Gender').required().withMessage('Gender is required.')
            .ensure('IsThaiNationality').required().withMessage('IsThaiNational is required.')
            .ensure('Address').required().withMessage('Address is required.')
        this.IsCreate = true;
        this.dialogService = dialogService;
        this.FindEthnicity();
        this.FindReligion();
        this.IsThaiNationality = false;
    }

    async loading(params) {
        if (params.id != null) {
            await this.SearchFarm(params.id);
            this.FarmId = params.id;
            this.IsCreate = false;
        } else {
            this.BeginEdit();
        }
    }

    async PrepareChildVMsAsync() {

        super.PrepareChildVMsAsync();
        this.PlotSearchVM = this.container.get(PlotSearchVM);
        this.DeviceSearchVM = this.container.get(DeviceSearchVM);
        this.ResponsiblePersonSearchVM = this.container.get(ResponsiblePersonSearchVM);
        
        this.PlotSearchVM.Load(this.FarmId);
        this.DeviceSearchVM.Load(this.FarmId);
        this.ResponsiblePersonSearchVM.Load(this.FarmId);


        this.AddChildNode(this.PlotSearchVM);
        this.AddChildNode(this.DeviceSearchVM);
        this.AddChildNode(this.ResponsiblePersonSearchVM);
    }



    async LoadOriginalSourceAsync(originalSource: FarmData) {
        this.Id = originalSource.Id;
        this.FarmId = originalSource.Id;
        this.Name = originalSource.Name;
        this.OwnerName = originalSource.OwnerName;
        this.Latitude = originalSource.Latitude;
        this.Longitude = originalSource.Longitude;
        this.latitudemap = originalSource.Latitude;
        this.longitudemap = originalSource.Longitude;
        this.Address = originalSource.Address;
        this.DateOfBirth = FsUtility.CreateDateObject(FsUtility.ParseDate(originalSource.DateOfBirth, 1));
        this.PhoneNumber = originalSource.PhoneNumber;
        this.IDNumber = originalSource.IDNumber;
        this.Gender = originalSource.Gender;
        this.IsThaiNationality = originalSource.IsThaiNationality;
        this.HasOriginalSource = true;
        this.LatLongName = originalSource.Latitude + " , " + originalSource.Longitude;
        this.ReligionId = originalSource.ReligionId;
        this.EthnicityId = originalSource.EthnicityId;
    }

    async SaveOriginalSourceAsync(originalSource: FarmData) {
        originalSource.Id = this.Id == null ? null : this.Id.trim();
        originalSource.Name = this.Name == null ? null : this.Name.trim();
        originalSource.OwnerName = this.OwnerName == null ? null : this.OwnerName.trim();
        originalSource.Latitude = this.Latitude;
        originalSource.Longitude = this.Longitude;

        originalSource.Address = this.Address;
        originalSource.DateOfBirth = this.DateOfBirth;
        originalSource.ReligionId = this.SelectedReligion;
        originalSource.EthnicityId = this.SelectedEthnicity;
        originalSource.PhoneNumber = this.PhoneNumber;
        originalSource.IDNumber = this.IDNumber;
        originalSource.Gender = this.Gender;
        originalSource.IsThaiNationality = this.IsThaiNationality;
    }

    async SearchFarm(id: string) {
        const self = this;
        const service = this.container.get(FarmAppService) as FarmAppService;

        try {
            const result = await service.FindByIdAsync(id) as FarmData;
            await self.SetOriginalSourceAsync(result);
            this.PrepareChildVMsAsync();
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateRequest(): FarmData {
        const criteria = new FarmData();
        criteria.Id = this.FarmId;
        criteria.Name = this.Name == null ? null : this.Name.trim();
        criteria.OwnerName = this.OwnerName == null ? null : this.OwnerName.trim();
        criteria.Latitude = this.Latitude;
        criteria.Longitude = this.Longitude;
        criteria.DateOfBirth = FsUtility.ToJsonDate(this.DateOfBirth);
        criteria.ReligionId = this.ReligionId;
        criteria.EthnicityId = this.EthnicityId;
        criteria.PhoneNumber = this.PhoneNumber;
        criteria.IDNumber = this.IDNumber;
        criteria.Gender = this.Gender;
        criteria.IsThaiNationality = this.IsThaiNationality;
        criteria.Address = this.Address;
        return criteria;
    }

    SaveData() {
        const self = this;
        self.ValidationController.validate({ object: self }).then(async result => {
            if (result.valid) {
                await this.SaveAsync(null, null);
            }
        });
    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;
        
        const request = await this.CreateRequest();
        const service = this.container.get(FarmAppService) as FarmAppService;
        if (this.HasOriginalSource) {
            try {
                const resultId = await service.FarmSaveAsync(request);
                const result = await service.FindByIdAsync(resultId) as FarmData;
                this.Id = result.Id;
                this.FarmId = result.Id;
                this.Name = result.Name;
                this.OwnerName = result.OwnerName;
                this.Latitude = result.Latitude;
                this.DateOfBirth = FsUtility.CreateDateObject(FsUtility.ParseDate(result.DateOfBirth, 1));
                this.ReligionId = result.ReligionId;
                this.EthnicityId = result.EthnicityId;
                this.PhoneNumber = result.PhoneNumber;
                this.IDNumber = result.IDNumber;
                this.Gender = result.Gender;
                this.IsThaiNationality = result.IsThaiNationality;
                this.PrepareChildVMsAsync();
                FsUtility.AlertModal("The item has been updated successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }
                        //await self.EndEditAsync();
                    }
                });
            }
            catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
        else {
            try {
                const resultId = await service.FarmSaveAsync(request);
                this.FarmId = resultId;
                
                FsUtility.AlertModal("The item has been saved successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }
                        //await self.EndEditAsync();
                        self.router.load("Modules/WanaD/FarmDetailPage/" + resultId);
                    }
                });
            }
            catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

    async CancelAsync() {
        const self = this;
        if (self.IsCreate)
            self.router.load("Modules/WanaD/FarmRegisterPage");
        else {
            await this.SetIsEditing(false);
            if (self.HasOriginalSource) {
                await this.LoadOriginalSourceAsync(self.OriginalSource);
            }
        }
    }

    BackPage() {
        const self = this;
        self.router.load("Modules/WanaD/FarmRegisterPage");
    }

    EthnicityDatas: any;
    async FindEthnicity() {

        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.FindEthnicityAsync() as EthnicityData[];
            this.EthnicityDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    ReligionDatas: any;
    async FindReligion() {

        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.FindReligionAsync() as ReligionData[];
            this.ReligionDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    LoadMap() {
        const self = this;
        const pos = fromLonLat([self.longitudemap, self.latitudemap]);

        self.view = new View({
            center: pos,
            zoom: 13,
        });

        self.map = new Map({
            view: self.view,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
                    }),
                }),
            ],
            target: "map",
        });
        const marker_el = document.getElementById("marker");
        self.marker = new Overlay({
            position: pos,
            positioning: "center-center",
            element: marker_el,
            stopEvent: false,
        });
        self.map.addOverlay(self.marker);
        let dragPan;
        self.map.getInteractions().forEach(function (interaction) {
            if (interaction instanceof DragPan) {
                dragPan = interaction;
            }
        });

        self.map.on("click", function (evt) {

            self.marker.setPosition(evt.coordinate);
            const lonlat = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            self.latitudemap = lonlat[1];
            self.longitudemap = lonlat[0];
            self.marker.set("dragging", false);

        });
    }

    search() {
        this.getNearest(this.NameLocation)
    }

    LatLongName: string;
    selectLocation() {
        this.Latitude = Number(this.latitudemap.toFixed(6));
        this.Longitude = Number(this.longitudemap.toFixed(6));
        this.LatLongName = this.Latitude + " , " + this.Longitude;
    }

    selectmap(item) {
        this.latitudemap = Number(item.lat);
        this.longitudemap = Number(item.lon);
        this.marker.setPosition(fromLonLat([this.longitudemap, this.latitudemap]));
        this.marker.set("dragging", false);
        this.flyTo(fromLonLat([this.longitudemap, this.latitudemap]), 14);
    }

    getNearest(string) {
        const self = this;
        return new Promise(function (resolve, reject) {
            const locale = sessionStorage.getItem("CurrentSystemLocale");
            const acceptlanguage =
                locale == null ? "th-TH" : locale == "th" ? "th-TH" : "en-US";
            //make sure the coord is on street
            fetch('https://nominatim.openstreetmap.org/search?q=' + string + '&format=jsonv2&limit=5&accept-language=' + acceptlanguage)
                .then(function (response) {
                    // Convert to JSON
                    return response.json();
                })
                .then(function (json) {
                    self.ListMap = json;
                });
        });
    }

    flyTo(location, zoom) {
        const self = this;
        const duration = 2000;

        let parts = 2;
        let called = false;
        function callback(complete) {
            --parts;
            if (called) {
                return;
            }
            if (parts === 0 || !complete) {
                called = true;
            }
        }
        self.view.animate(
            {
                center: location,
                duration: duration,
            },
            callback
        );
        self.view.animate(
            {
                zoom: zoom - 1,
                duration: duration / 2,
            },
            {
                zoom: zoom,
                duration: duration / 2,
            },
            callback
        );
    }

    NameLocation: string;
    latitudemap = 18.12881319372988;
    longitudemap = 99.2808172978311;
    map: any;
    ListMap: any;
    marker
    view = new View({
        center: fromLonLat([this.longitudemap, this.latitudemap]),
        zoom: 7,
    });
    Easting: number
    Northing: number
    ZoneNumber: number
    ZoneLetter: string

    EastingError = false;
    EastingErrorMessage = "";
    NorthingError = false;
    NorthingErrorMessage = "";
    ZoneNumberError = false;
    ZoneNumberErrorMessage = "";
    ZoneLetterError = false;
    ZoneLetterErrorMessage = "";

    GoToUTM() {
        this.EastingError = false;
        this.NorthingError = false;
        this.ZoneNumberError = false;
        this.ZoneLetterError = false;
        if (this.Easting == null) {
            this.EastingError = true;
            this.EastingErrorMessage = "Easting is required."
        } else {
            if (this.Easting > 999999 || this.Easting < 100000) {
                this.EastingError = true;
                this.EastingErrorMessage = "Easting out of range (must be between 100 000 m and 999 999 m)"
            }
        }
        if (this.Northing == null) {
            this.NorthingError = true;
            this.NorthingErrorMessage = "Northing is required."
        } else {
            if (this.Northing > 10000000 || this.Northing < 0) {
                this.NorthingError = true;
                this.NorthingErrorMessage = "Northing out of range (must be between 0 m and 10 000 000 m)."
            }
        }
        if (this.ZoneNumber == null) {
            this.ZoneNumberError = true;
            this.ZoneNumberErrorMessage = "Zone Number is required."
        }
        if (this.ZoneLetter == null) {
            this.ZoneLetterError = true;
            this.ZoneLetterErrorMessage = "Zone Letter is required."
        }
        if (this.EastingError || this.NorthingError || this.ZoneNumberError || this.ZoneLetterError) {
            return
        }
        const latitudeLongitude = utm.toLatLon(this.Easting, this.Northing, this.ZoneNumber, this.ZoneLetter);
        const item = { lat: latitudeLongitude.latitude, lon: latitudeLongitude.longitude };
        this.selectmap(item);

    }
}
