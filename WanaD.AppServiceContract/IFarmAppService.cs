using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IFarmAppService
    {
        Task<List<FarmData>> FindAsync(FarmParameter parameter);
        Task<int> Count(FarmSearchCriteria criteria);
        Task<FarmData> FindByIdAsync(Guid farmId);
        Task<List<EthnicityData>> FindEthnicityAsync();
        Task<List<ReligionData>> FindReligionAsync();
        Task<Guid> FarmSaveAsync(FarmData farmSaveData);
        Task<List<PlotData>> FindPlotAsync(PlotParameter parameter);
        Task<int> PlotCount(PlotSearchCriteria criteria);
        Task<List<PlotDeviceData>> FindPlotDeviceAsync(PlotDeviceParameter parameter);
        Task<int> PlotDeviceCount(PlotDeviceSearchCriteria criteria);
        Task<Guid> PlotSaveAsync(PlotData plotSaveData);
        Task<Guid> PlotDeviceSaveAsync(PlotDeviceData plotDeviceSaveData);
        Task<List<BankData>> FindBankAsync();
        Task<List<PlotData>> FindPlotNameAsync(PlotSearchCriteria parameter);
        Task FarmRemoveAsync(Guid farmId);
        Task PlotRemoveAsync(Guid plotId);
        Task PlotDeviceRemoveAsync(Guid deviceId);
        Task<List<ResponsiblePersonData>> FindResponsiblePersonAsync(ResponsiblePersonParameter parameter);
        Task<int> ResponsiblePersonCount(ResponsiblePersonSearchCriteria criteria);
        Task<List<UserProfileData>> FindUserProfileAsync();
        Task<List<ResponsiblePersonData>> FindResponsiblePersonAutoCompleteAsync(ResponsiblePersonSearchCriteria parameter);
        Task<List<PlotData>> FindPlotAutoCompleteAsync(PlotSearchCriteria parameter);
        Task<Guid> AddResponsiblePersonAsync(ResponsiblePersonData responsiblePersonSaveData);
        Task<Guid> UpdateResponsiblePersonAsync(ResponsiblePersonData responsiblePersonSaveData);
        Task<Guid> RemoveResponsiblePersonAsync(RemoveResponsiblePersonData removeResponsiblePersonData);
        Task<List<DeviceData>> FindMasterDeviceAsync();

    }
}
