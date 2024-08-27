using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections.ObjectModel;
using System.Runtime.Serialization;

namespace Fs.Erp.Core
{
    [DataContract]
    [Serializable]
    public class UserProfile
    {
        [DataMember]
        public string Login { get; private set; }

        [DataMember]
        public ReadOnlyCollection<Guid> GroupIds { get; private set; }

        [DataMember]
        public Guid UserUID { get; private set; }

        [DataMember]
        public string Name { get; private set; }

        [DataMember]
        public string Email { get; private set; }

        [DataMember]
        public string Realm { get; private set; }

        [DataMember]
        public string ExternalId { get; private set; }

        public UserProfile(string login, Guid userUID, string name, string realm, string email, IList<Guid> groupIds, string externalId)
        {
            this.Login = login;
            this.UserUID = userUID;
            this.Name = name;
            this.Realm = realm;
            this.Email = email;
            this.ExternalId = externalId;
            this.GroupIds = new ReadOnlyCollection<Guid>(groupIds);
        }

        public void UpdateRealm(string realm)
        {
            this.Realm = realm;
        }
    }
}
