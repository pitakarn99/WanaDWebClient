
 

 

 

    import FarmAndPlotData from 'Modules/WanaD/Scripts/AppServiceContract/FarmAndPlotData';

    import NameAndIdData from 'Modules/WanaD/Scripts/AppServiceContract/NameAndIdData';

 
class VisitPlotCollectionData 
{
    
        Id: string;
    
        Farm: FarmAndPlotData;
    
        Plot: NameAndIdData;
    
        Score: number;
    
        VisitedDate: Date;
    
        TestResult: string;
    
        BiomassPerRai: number;
    
        BiomassDetails: string;
    
        MonsoonStaff: string;
    
        Remark: string;
    
        IsSummarized: boolean;
    
        FileInfoList: any;
    
}
 
export default VisitPlotCollectionData;
 




