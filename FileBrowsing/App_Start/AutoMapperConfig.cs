using System.IO;
using AutoMapper;
using FileBrowsing.Models;

namespace FileBrowsing.App_Start
{
    public static class AutoMapperConfig
    {
        public static IMapper ServiceMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<DirectoryInfo, FolderNode>()
                    .ConstructUsing(x => new FolderNode(
                        x.Parent == null ? null : x.Parent.FullName,
                        x.FullName,
                        x.Name));

                cfg.CreateMap<FileInfo, FileNode>()
                    .ConstructUsing(x => new FileNode(
                         x.DirectoryName,
                         x.FullName,
                         x.Name));

                cfg.CreateMap<DriveInfo, FolderNode>()
                .ConstructUsing(x => new FolderNode(
                    null,
                    x.Name,
                    x.Name));
            });

            return config.CreateMapper();
        }

    }
}