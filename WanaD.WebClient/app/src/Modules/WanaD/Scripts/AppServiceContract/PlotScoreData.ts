
 

 

 

    import FarmAndPlotData from 'Modules/WanaD/Scripts/AppServiceContract/FarmAndPlotData';

    import NameAndIdData from 'Modules/WanaD/Scripts/AppServiceContract/NameAndIdData';

 
class PlotScoreData 
{
    
        Id: string;
    
        Farm: FarmAndPlotData;
    
        Plot: NameAndIdData;
    
        TotalScore: number;
    
        Date: Date;
    
        Result: string;
    
        VerifierName: string;
    
        VerifierDate: Date;
    
        StatusCode: string;
    
        StatusName: string;
    
        MonsoonStaff: string;
    
        Remark: string;
    
        FileInfoList: any;
    
        WorkflowDocumentId: string;
    
}
 
export default PlotScoreData;
 




