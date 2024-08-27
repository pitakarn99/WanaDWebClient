using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using Microsoft.Practices.EnterpriseLibrary.Validation.Integration.WCF;
using Fs.Core.Data;
using Fs.Core;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace Fs.Erp.Core.AppServiceContract
{
    [ServiceContract]
    public interface IEducationAndFeeManagerService
    {
        [OperationContract]
        [FaultContract(typeof(DataValidationException))]
        [FaultContract(typeof(ApplicationSecurityException))]
        [FaultContract(typeof(ValidationFault))]
        [FaultContract(typeof(ValidationResults))]
        IList<EducationLevelData> FindEducationLevel(EducationAndFeeManagerServiceCriteria criteria);

        [OperationContract]
        [FaultContract(typeof(DataValidationException))]
        [FaultContract(typeof(ApplicationSecurityException))]
        [FaultContract(typeof(ValidationFault))]
        [FaultContract(typeof(ValidationResults))]
        Guid AddEducationLevel(EducationLevelUpdateRequest request);

        [OperationContract]
        [FaultContract(typeof(DataValidationException))]
        [FaultContract(typeof(ApplicationSecurityException))]
        [FaultContract(typeof(ValidationFault))]
        [FaultContract(typeof(ValidationResults))]
        void UpdateEducationLevel(EducationLevelUpdateRequest request);

        [OperationContract]
        [FaultContract(typeof(DataValidationException))]
        [FaultContract(typeof(ApplicationSecurityException))]
        [FaultContract(typeof(ValidationFault))]
        [FaultContract(typeof(ValidationResults))]
        void RemoveEducationLevel(Guid guid);

        [OperationContract]
        [FaultContract(typeof(DataValidationException))]
        [FaultContract(typeof(ApplicationSecurityException))]
        [FaultContract(typeof(ValidationFault))]
        [FaultContract(typeof(ValidationResults))]
        IList<EducationFeeData> FindEducationFee(EducationAndFeeManagerServiceCriteria criteria);

        [OperationContract]
        [FaultContract(typeof(DataValidationException))]
        [FaultContract(typeof(ApplicationSecurityException))]
        [FaultContract(typeof(ValidationFault))]
        [FaultContract(typeof(ValidationResults))]
        Guid AddEducationFee(EducationFeeUpdateRequest request);

        [OperationContract]
        [FaultContract(typeof(DataValidationException))]
        [FaultContract(typeof(ApplicationSecurityException))]
        [FaultContract(typeof(ValidationFault))]
        [FaultContract(typeof(ValidationResults))]
        Guid UpdateEducationFee(EducationFeeUpdateRequest request);

        [OperationContract]
        [FaultContract(typeof(DataValidationException))]
        [FaultContract(typeof(ApplicationSecurityException))]
        [FaultContract(typeof(ValidationFault))]
        [FaultContract(typeof(ValidationResults))]
        void RemoveEducationFee(Guid guid);
    }
}
