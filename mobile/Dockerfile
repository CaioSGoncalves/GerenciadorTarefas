# FROM gradle:4.10.0-jdk8

# USER root

# ENV SDK_URL="https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip" \
#     ANDROID_HOME="/usr/local/android-sdk" \
#     ANDROID_VERSION=28 \
#     ANDROID_BUILD_TOOLS_VERSION=27.0.3

# # Download Android SDK
# RUN mkdir "$ANDROID_HOME" .android \
#     && cd "$ANDROID_HOME" \
#     && curl -o sdk.zip $SDK_URL \
#     && unzip sdk.zip \
#     && rm sdk.zip \
#     && mkdir "$ANDROID_HOME/licenses" || true \
#     && echo "24333f8a63b6825ea9c5514f83c2829b004d1fee" > "$ANDROID_HOME/licenses/android-sdk-license"
# #    && yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses

# # Install Android Build Tool and Libraries
# RUN $ANDROID_HOME/tools/bin/sdkmanager --update
# RUN $ANDROID_HOME/tools/bin/sdkmanager "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
#     "platforms;android-${ANDROID_VERSION}" \
#     "platform-tools"

# # Install Build Essentials
# RUN apt-get update && apt-get install build-essential -y && apt-get install file -y && apt-get install apt-utils -y


# RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo bash - \
#     && sudo apt install nodejs





# FROM node:alpine

FROM ubuntu:latest

# Install Build Essentials
RUN yes | apt-get -qq update && apt-get -qq install apt-utils \
    && apt-get -qq install software-properties-common \
    && apt-get -qq install curl && apt-get -qq install unzip

# Install node.js
RUN yes | curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get -qq install nodejs

# CLI (Command Line Interface) do React Native
RUN npm install -g react-native-cli

# jdk 8
RUN yes | add-apt-repository ppa:openjdk-r/ppa \
    && apt-get -qq update \
    && apt-get -qq install openjdk-8-jdk \
    && java -version

# RUN apt -qq -y install gcc-multilib lib32z1 lib32stdc++6

# Android SDK setup
ENV SDK_URL="https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip"
ENV ANDROID_HOME /Android/Sdk

# Download Android SDK
RUN \
    mkdir "/Android" \
    && cd "/Android" \
    && mkdir "/Sdk" \
    && cd "/Sdk" \
    && curl -o sdk.zip $SDK_URL \
    && unzip sdk.zip \
    && rm sdk.zip

# RUN mkdir /Android/Sdk \
#     && cd /Android/Sdk \
#     && curl -o sdk.zip $SDK_URL \
#     && unzip sdk.zip \
#     && rm sdk.zip

ENV PATH "$PATH:/Android/Sdk/tools"
ENV PATH "$PATH:/Android/Sdk/platform-tools"

RUN cd "/Android" && cd "/Sdk" && cd "tools" && cd "bin" && ls

# RUN cd "/Android" && cd "/Sdk" && cd "tools" && cd "bin" \
#     && "/sdkmanager" "platform-tools" "platforms;android-27" "build-tools;27.0.3" \
#     && yes | /Android/Sdk/tools/bin/sdkmanager "platform-tools" "platforms;android-27" "build-tools;27.0.3"

RUN /Android/Sdk/tools/bin/sdkmanager --update
RUN yes | /Android/Sdk/tools/bin/sdkmanager "platform-tools" "platforms;android-27" "build-tools;27.0.3"

WORKDIR /work

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "react-native", "run-android"]
