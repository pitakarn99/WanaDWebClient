
 

 

 

    import FileInfoData from 'Modules/Core/Scripts/AppServiceContract/FileInfoData';

 
class FileRelationData 
{
    
        Id: string | null;
    
        ReferenceId: string | null;
    
        FileInfoId: string;
    
        RelationType: number;
    
        CreatorUserProfileId: string | null;
    
        FileInfoData: FileInfoData;
    
        IsUploadByBU: boolean;
    
        IsUploadByReviewer: boolean;
    
        Ordinal: number | null;
    
}
 
export default FileRelationData;
 




