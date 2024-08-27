import DocEditorVMBase from "Lib/Fs.SmartClient.Client/DocEditorVMBase";
import FileData from "../../Scripts/AppServiceContract/FileData";

export default class FileUploadDocEditorVM extends DocEditorVMBase {
    public Id: string;
    public FileName: string;

    constructor() {
        super();
    }

    async LoadOriginalSourceAsync(originalSource: FileData) {
        this.Id = originalSource.Id;
        this.FileName = originalSource.FileName;
    }

    async SaveOriginalSourceAsync(originalSource: FileData) {
        originalSource.Id = this.Id;
        originalSource.FileName = this.FileName;
    }

}
