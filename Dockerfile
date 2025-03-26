FROM eclipse-temurin:21
COPY backend/target/memodesigner.jar memodesigner.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "memodesigner.jar"]