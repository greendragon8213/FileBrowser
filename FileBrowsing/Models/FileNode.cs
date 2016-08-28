namespace FileBrowsing.Models
{
    public class FileNode : HierarchyNode
    {
        
        public FileNode(string parentPath, string fullPath, string name) 
            : base(parentPath, fullPath, name)
        {
        }
    }
}