using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OrderTracker.Web.Models
{
    public class Result
    {
        public string ErrorMessage { get; set; }

        public bool IsSuccess { get; set; }
    }
}