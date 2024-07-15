namespace ThreePanelStructure.Middlewares
{
    public class ExceptionHandler
    {
        private readonly ILogger<ExceptionHandler> logger;
        private readonly RequestDelegate next;

        public ExceptionHandler(ILogger<ExceptionHandler> logger, RequestDelegate next)
        {
            this.logger = logger;
            this.next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await next(httpContext);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                httpContext.Response.StatusCode = 500;
                httpContext.Response.ContentType = "application/json";

                var error = new
                {
                    message = "Something Went wrong, Try Again Later!!!"
                };
                await httpContext.Response.WriteAsJsonAsync(error);
            }
        }
    }
}
