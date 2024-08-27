import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import { IDialogService } from "@aurelia/dialog";
import template from './ManageBiodiversityChartSearchView.html';
import { customElement, resolve } from 'aurelia';
import TabViewModel from "../../../../Lib/Fs.SmartClient.Client/TabViewModel";
import BioAcousticScoreSearchCriteria from "../../Scripts/AppServiceContract/BioAcousticScoreSearchCriteria";
import ApexCharts from 'apexcharts'
import ManageBiodiversityContractAppService from "../../Scripts/AppServiceContract/ManageBiodiversityContractAppService";
import BioAcousticScoreData from "../../Scripts/AppServiceContract/BioAcousticScoreData";
@customElement({
    name: 'ManageBiodiversityChartSearchView',
    template
})
export default class ManageBiodiversityChartSearchVM extends TabViewModel {
    DeviceId: string;
    DateRequest: Date;
    router: IRouter = resolve(IRouter)
    i18n: any;
    barChart: any;
    gidChart: any;
    Data: BioAcousticScoreData;
    dialogService: IDialogService = resolve(IDialogService)
    constructor() {
        super();
    }

    async SearchAsync() {
        var self = this;
        if (self.DeviceId == null || self.DateRequest == null) {
            FsUtility.AlertModal("กรุณาเลือก Device และ วันที่", 1, 2);
        } else {
            const req = self.CreateCriteria();
            const service = self.container.get(ManageBiodiversityContractAppService) as ManageBiodiversityContractAppService;

            try {
                const result = await service.FindBioAcousticScoreAsync(req);
                self.Data = result;
                self.LoadBarChart();
                self.LoadGidChart();
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }

    }

    CreateCriteria(): BioAcousticScoreSearchCriteria {
        const cri = new BioAcousticScoreSearchCriteria();
        cri.DeviceId = this.DeviceId;
        cri.Date = FsUtility.ToJsonDate(this.DateRequest)

        return cri;
    }
    async LoadGidChart() {
        const self = this;

        if (self.gidChart != null) {
            await self.gidChart.destroy();
        }
        if (self.Data == null) return
        self.gidChart = new Object();
        const series = self.Data.BioAcousticSpeciesDatas.map(t => ({ name: t.Name, data: t.Data }));

        const options = {
            series: series,
            colors: ["#065535"],
            chart: {

                type: 'heatmap',
            },
            dataLabels: {
                enabled: true,
                style: {
                    colors: ['#000']
                }
            },
            toolbar: { show: false, }
        };

        self.gidChart = new ApexCharts(document.querySelector("#gidChart"), options);
        self.gidChart.render();

    }
    async LoadBarChart() {
        const self = this;

        if (self.barChart != null) {
            await self.barChart.destroy();
        }
        if (self.Data == null) return
        const series = self.Data.BioAcousticSpeciesDatas.map(t => t.SumData);
        const categories = self.Data.BioAcousticSpeciesDatas.map(t => t.Name);

        self.barChart = new Object();
        const options = {
            series: [{
                data: series
            }],
            colors: ["#065535"],
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            }
            ,
            toolbar: { show: false, },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: categories,
            }
        };

        self.barChart = new ApexCharts(document.querySelector("#barChart"), options);
        self.barChart.render();

    }


    FindDevice(obj) {
        const self = this;
        const params = obj.params,
            success = obj.success,
            failure = obj.failure;
        if (params == undefined && success == undefined && failure == undefined) {
            return;
        }
        const service = this.container.get(
            ManageBiodiversityContractAppService
        ) as ManageBiodiversityContractAppService;

        if (params?.data?.term != null) {
            service
                .FindDeviceAsync(params.data.term)
                .done(function (result) {
                    success(result);
                })
                .fail(function (error) {
                    FsUtility.CommonErrorHandler(error);
                    failure(error);
                });
        }
    }
}
