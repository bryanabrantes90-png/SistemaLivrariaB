FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-22.0.2-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install 

FROM openjdk:22.0.2-jdk-slim

EXPOSE 8085

COPY --from=build /target/deploy_render-1.0.0.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]