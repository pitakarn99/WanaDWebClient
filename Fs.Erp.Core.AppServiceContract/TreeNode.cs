using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class TreeNode
    {
        public string id { get; set; }
        public string parent { get; set; }
        public string text { get; set; }
        public string icon { get; set; }
        public TreeNodeState state { get; set; }
        public bool children { get; set; }
        public object li_attr { get; set; }
        public object a_attr { get; set; }

        public TreeNode()
        {
            state = new TreeNodeState();
        }
    }
}
