namespace FileBrowsing.Models
{
    public interface IHierarchyNode
    {
        string ParentPath { get; }

        string FullPath { get; }

        string Name { get; }
    }
}
