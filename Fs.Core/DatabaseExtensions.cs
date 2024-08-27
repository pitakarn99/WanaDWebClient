using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data.Common;

namespace Fs.System.Data
{
    public static class DatabaseExtensions
    {
        public static DataAccessor<TResult> CreateFsCommandAccessor<TResult>(this Database database, DbCommand command, IRowMapper<TResult> rowMapper)
        {
            return new FsCommandAccessor<TResult>(database, command, rowMapper);
        }
    }    

    public class FsCommandAccessor<TResult> : CommandAccessor<TResult>
    {
        DbCommand command; 

        public FsCommandAccessor(Database database, DbCommand command, IRowMapper<TResult> rowMapper) : base(database, rowMapper)
        {
            this.command = command;
        }

        public override IEnumerable<TResult> Execute(params object[] parameterValues)
        {
            return base.Execute(command);
        }

        public override IAsyncResult BeginExecute(AsyncCallback callback, object state, params object[] parameterValues)
        {
            return Database.BeginExecuteReader(command, callback, state);
        }
    }
}
