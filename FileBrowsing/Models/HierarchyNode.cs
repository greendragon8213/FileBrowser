namespace FileBrowsing.Models
{
    public abstract class HierarchyNode : IHierarchyNode
    {
        public string ParentPath { get; }

        public string FullPath { get; }

        public string Name { get; }

        protected HierarchyNode(string parentPath, string fullPath, string name)
        {
            ParentPath = parentPath;
            FullPath = fullPath;
            Name = name;
        }
    }
}