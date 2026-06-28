---
layout: post
title: "One click install RustNet on Debian 13 with GeoLite2 database"
date: 2026-06-28 14:20:00 +0800
categories: blog
---

## Background

As of now, [RustNet](https://github.com/domcyrus/rustnet) is not available in the official Debian 13 repositories. [Manual installation is required](https://github.com/domcyrus/rustnet/blob/cfab164c93c7ef8ac757d1a7847bb7aae6bf54ff/INSTALL.md#debianubuntu-deb-packages), which downloads debian packages from GitHub releases. We can call GitHub public API to retrieve the latest release and download the debian package automatically.

Also, rustnet supports [GeoLite2 database for IP geolocation](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data/). We can download the latest GeoLite2 database from *unofficial* GitHub releases and place it in `/root` directory. When you login as the root user, rustnet will automatically load the GeoLite2 database in `/root` directory. You could put the database in any of the supported paths too. (If you have an MaxMind account, you could use the tool `sudo apt install geoipupdate mmdb-bin` instead`.)

```sh
root@localhost:~# rustnet -h
Cross-platform network monitoring tool

Usage: rustnet [OPTIONS]

Options:
// ...
      --geoip-country <PATH>
          Path to GeoLite2-Country.mmdb database. Auto-discovered from: ./resources/geoip2, $XDG_DATA_HOME/rustnet/geoip, ~/.local/share/rustnet/geoip, /usr/share/GeoIP, /usr/local/share/GeoIP, /opt/homebrew/share/GeoIP, /var/lib/GeoIP
      --geoip-asn <PATH>
          Path to GeoLite2-ASN.mmdb database (same search paths as --geoip-country)
      --geoip-city <PATH>
          Path to GeoLite2-City.mmdb database (same search paths as --geoip-country; superset of Country — provides city name and postal code in addition to country)
      --no-geoip
          Disable GeoIP lookups entirely
// ...
```

## Script

This script assumes root user. Run `sudo su` first if you are not root.

```sh
deb="/root/rustnet.deb"

arch="$(dpkg --print-architecture)"
case "$arch" in
amd64|arm64|armhf) ;;
*) echo "Unsupported architecture for RustNet: $arch" >&2; exit 1 ;;
esac

url="$(
curl -fsSL https://api.github.com/repos/domcyrus/rustnet/releases/latest \
| grep "browser_download_url" \
| grep -io "https://[^\"]*rustnet_linuxdeb_${arch}\\.deb" \
| head -n1
)"

test -n "$url"
wget -q "$url" -O "$deb"
dpkg -i "$deb" || apt-get install -f -y
rm -f "$deb"

cd /root
wget -qO- https://api.github.com/repos/P3TERX/GeoLite.mmdb/releases/latest \
| grep "browser_download_url" \
| grep -E "GeoLite2-(ASN|City|Country)\.mmdb" \
| cut -d '"' -f 4 \
| wget -qi -

rustnet
```
