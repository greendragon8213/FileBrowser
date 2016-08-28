using System.ComponentModel;
using FileBrowsing.Common;

namespace FileBrowsing.Models
{
    public class Filter
    {
        public double MinFileLengthMb { get; set; } = 0;
        
        public double MaxFileLengthMb { get; set; } = (long.MaxValue / Constants.BytesCountInMegabyte);
    }
}