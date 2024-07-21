FROM python:3.9-slim AS base

################################################################################
#                                    server                                    #
################################################################################


#------------------------------------------------------------------------------#
#                               Dependency Stage                               #
#------------------------------------------------------------------------------#

FROM base AS dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt


#------------------------------------------------------------------------------#
#                                Runtime Stage                                 #
#------------------------------------------------------------------------------#

FROM dependencies AS runtime
EXPOSE 80/tcp
COPY . .
# --proxy-headers is used to trust the headers from the proxy server (in case of using a load-balancer)
# --port is used to specify the port to listen on
CMD ["uvicorn", "app.main:app", "--proxy-headers", "--port", "80", "--host", "0.0.0.0"]
