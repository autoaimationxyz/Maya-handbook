# App signing key

`maya-release.jks` signs `MayaTraders.apk` (alias `maya`, password in `password.txt`). Android only lets an app update itself if every version is signed with the same key, so don't change or delete these files.

The key is public because this repo is public. For a personal app that's an acceptable trade-off: someone could sign a fake "update", but it would only reach your phone if you installed an APK they sent you. Only install updates from this repo's Releases page.
