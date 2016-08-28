using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;

namespace FileBrowsing.Extensions
{
    public static class DirectoryInfoExtension
    {
        private const string AllFilesPattern = "*";

        public static IEnumerable<FileInfo> GetAvailableNestedFiles(this DirectoryInfo directoryInfo)
        {
            var nestedFilesPathes = GetAvailableNestedFilesPathes(directoryInfo.FullName);

            foreach (var nestedFilePath in nestedFilesPathes)
            {
                var nestedFileInfo = GetFileInfoByFilePath(nestedFilePath);

                if (nestedFileInfo == null)
                {
                    continue;
                }

                yield return nestedFileInfo;
            }
        }

        public static IEnumerable<DirectoryInfo> GetAvailableSubDirectories(this DirectoryInfo directoryInfo)
        {
            var directoriesInCurrentDirectory = GetAvailableSubDirectoriesPathes(directoryInfo.FullName);

            foreach (var subDirectoryPath in directoriesInCurrentDirectory)
            {
                var subDirectoryInfo = GetDirectoryInfoByDirectoryPath(subDirectoryPath);

                if (subDirectoryInfo == null)
                {
                    continue;
                }

                yield return subDirectoryInfo;
            }
        }

        public static IEnumerable<FileInfo> GetAllAvailableFilesByPredicate(this DirectoryInfo directoryInfo, Expression<Func<FileInfo, bool>> predicate)
        {
            return directoryInfo
                .GetAllAvailableFiles()
                .AsQueryable()
                .Where(predicate);
        }
        
        private static IEnumerable<FileInfo> GetAllAvailableFiles(this DirectoryInfo directoryInfo)
        {
            var directoriesWeAreLookingIn = new Stack<string>();

            directoriesWeAreLookingIn.Push(directoryInfo.FullName);

            while (directoriesWeAreLookingIn.Count != 0)
            {
                var currentDirectoryPath = directoriesWeAreLookingIn.Pop();
                var availableNestedFilesPathes = GetAvailableNestedFilesPathes(currentDirectoryPath);

                foreach (var filePath in availableNestedFilesPathes)
                {
                    var fileInfo = GetFileInfoByFilePath(filePath);

                    if (fileInfo == null)
                    {
                        continue;
                    }

                    yield return fileInfo;
                }

                var directoriesInCurrentDirectory = GetAvailableSubDirectoriesPathes(currentDirectoryPath);

                foreach (var subDirectory in directoriesInCurrentDirectory)
                {
                    directoriesWeAreLookingIn.Push(subDirectory);
                }
            }
        }

        private static string[] GetAvailableSubDirectoriesPathes(string path)
        {
            try
            {
                return Directory.GetDirectories(path);
            }
            catch (DirectoryNotFoundException)
            {
            }
            catch (PathTooLongException)
            {
            }
            catch (UnauthorizedAccessException)
            {
            }
            catch (IOException)
            {
            }

            return new string[0];
        }

        private static string[] GetAvailableNestedFilesPathes(string path)
        {
            try
            {
                return Directory.GetFiles(path, AllFilesPattern);
            }
            catch (DirectoryNotFoundException)
            {
            }
            catch (PathTooLongException)
            {
            }
            catch (UnauthorizedAccessException)
            {
            }
            catch (IOException)
            {
            }

            return new string[0];
        }

        private static DirectoryInfo GetDirectoryInfoByDirectoryPath(string path)
        {
            try
            {
                return new DirectoryInfo(path);
            }
            catch (DirectoryNotFoundException)
            {
            }
            catch (PathTooLongException)
            {
            }
            catch (UnauthorizedAccessException)
            {
            }

            return null;
        }

        private static FileInfo GetFileInfoByFilePath(string path)
        {
            try
            {
                return new FileInfo(path);
            }
            catch (PathTooLongException)
            {
            }
            catch (UnauthorizedAccessException)
            {
            }

            return null;
        }
    }
}