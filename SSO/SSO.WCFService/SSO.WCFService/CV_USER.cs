//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SSO.WCFService
{
    using System;
    using System.Collections.Generic;
    
    public partial class CV_USER
    {
        public CV_USER()
        {
            this.CV_CLAIM = new HashSet<CV_CLAIM>();
            this.CV_MANAGE_ROLES = new HashSet<CV_MANAGE_ROLES>();
        }
    
        public int USER_ID { get; set; }
        public string USERNAME { get; set; }
        public string PASSWORD { get; set; }
        public string SALT { get; set; }
    
        public virtual ICollection<CV_CLAIM> CV_CLAIM { get; set; }
        public virtual ICollection<CV_MANAGE_ROLES> CV_MANAGE_ROLES { get; set; }
    }
}
