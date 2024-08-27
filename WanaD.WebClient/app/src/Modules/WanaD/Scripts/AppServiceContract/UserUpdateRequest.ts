
 

 

 

 
class UserUpdateRequest 
{
    
        Login: string;
    
        Password: string;
    
        Name: string;
    
        Email: string;
    
        IsActive: boolean;
    
        IsLocked: boolean;
    
        IsGroup: boolean;
    
        Provider: string;
    
        UserUID: string;
    
        PasswordExpireDate: Date;
    
        AuthType: any;
    
        ExternalUserId: string;
    
        IsRequirePassword: boolean;
    
}
 
export default UserUpdateRequest;
 




