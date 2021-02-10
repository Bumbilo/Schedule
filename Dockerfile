FROM microsoft/mssql-server-linux
ADD db/mssql/ /var/opt/mssql/
VOLUME /var/opt/mssql
EXPOSE 1433