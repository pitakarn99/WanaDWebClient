
 

 

 

 
class UserUpdateRequest 
{
    
        Login: string;
    
        Password: string;
    
        Name: string;
    
        Email: string;
    
        IsActive: boolean | null;
    
        IsLocked: boolean;
    
        IsGroup: boolean;
    
        Provider: string;
    
        UserUID: string | null;
    
        PasswordExpireDate: Date | null;
    
        AuthType: any;
    
        ExternalUserId: string;
    
        IsRequirePassword: boolean;
    
}
 
export default UserUpdateRequest;
 




