using System.Collections.Generic;

namespace FileBrowsing.Models
{
    public class FolderNode : HierarchyNode
    {
        public List<FolderNode> SubFolders { get; set; }

        public List<FileNode> NestedFiles { get; set; }
        
        public FolderNode(string parentPath, string fullPath, string name) 
            : base(parentPath, fullPath, name)
        {
        }
    }
}