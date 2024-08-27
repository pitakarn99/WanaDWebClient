#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
RUN apt-get update
RUN apt-get install apt-file -qq
RUN apt-get install vim -qq
RUN apt-get install procps -qq
RUN apt-get install iputils-ping -qq
RUN apt-get install libnetcdf-dev -qq

COPY . .
#ENTRYPOINT ["bash"]
ENTRYPOINT ["dotnet", "WanaD.WebClient.dll"]