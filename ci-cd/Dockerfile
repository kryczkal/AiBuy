FROM python:3.9-slim AS base

################################################################################
#                                   PyTests                                    #
################################################################################

#------------------------------------------------------------------------------#
#                               Dependency Stage                               #
#------------------------------------------------------------------------------#

FROM base AS dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#------------------------------------------------------------------------------#
#                                Runtime Stage                                 #
#------------------------------------------------------------------------------#

FROM dependencies AS runtime
# Uncomment this to allow the image to listen on specific ports
# EXPOSE <port>/<udp/tcp>
COPY . .
CMD ["pytest", "tests/", "--html=pytest_report.html", "--self-contained-html"]
