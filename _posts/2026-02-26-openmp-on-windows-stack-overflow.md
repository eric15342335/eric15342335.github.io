---
layout: post
title: "OpenMP on Windows stack overflow when using large stack"
date: 2026-02-26 20:58:30 +0800
categories: blog
---

On Windows, when we compile an OpenMP program with large stack usage using mingw-w64 by default, it will throw a stack overflow error (0xc00000fd):

```shell
123er@eric310  /d/Personal Data/Repositories/personal-repo/APAI4013/Assignment-1
$ gcc -fopenmp task2.c -static -g
```

```shell
123er@eric310  /d/Personal Data/Repositories/personal-repo/APAI4013/Assignment-1
$ strace ./a
--- Process 6256 created
--- Process 6256 loaded C:\Windows\System32\ntdll.dll at 00007fffbfd20000
--- Process 6256 loaded C:\Windows\System32\kernel32.dll at 00007fffbe720000
--- Process 6256 loaded C:\Windows\System32\KernelBase.dll at 00007fffbc810000
--- Process 6256 loaded C:\Windows\System32\ucrtbase.dll at 00007fffbd970000
--- Process 6256 thread 5832 created
--- Process 6256, exception c00000fd at 00007ff761779226
--- Process 6256 thread 17792 exited with status 0xc00000fd
--- Process 6256 exited with status 0xc00000fd
```

Adding the `-Wl,--stack,1000000000` flag to GCC can resolve this issue by increasing the stack size used by the program:

```shell
123er@eric310  /d/Personal Data/Repositories/personal-repo/APAI4013/Assignment-1
$ gcc -fopenmp task2.c -static -g -Wl,--stack,10000000000 
```

```shell
123er@eric310  /d/Personal Data/Repositories/personal-repo/APAI4013/Assignment-1
$ strace ./a
--- Process 20596 created
--- Process 20596 loaded C:\Windows\System32\ntdll.dll at 00007fffbfd20000
--- Process 20596 loaded C:\Windows\System32\kernel32.dll at 00007fffbe720000
--- Process 20596 loaded C:\Windows\System32\KernelBase.dll at 00007fffbc810000
--- Process 20596 loaded C:\Windows\System32\ucrtbase.dll at 00007fffbd970000
--- Process 20596 thread 1092 created
--- Process 20596 thread 5492 created
// ... more threads created
--- Process 20596 loaded C:\Windows\System32\kernel.appcore.dll at 00007fffbb4c0000
--- Process 20596 loaded C:\Windows\System32\msvcrt.dll at 00007fffbf020000
Time taken: 0.898000 seconds
41
6334
15724
24464
9961
32391
18716
19912
17673
20037
 18467
 26500  19169
 11478  29358  26962
  5705  28145  23281  16827
   491   2995  11942   4827   5436
 14604   3902    153    292  12382  17421
 19718  19895   5447  21726  14771  11538   1869
 25667  26299  17035   9894  28703  23811  31322  30333
  4664  15141   7711  28253   6868  25547  27644  32662  32757
 12859   8723   9741  27529    778  12316   3035  22190   1842    288
757147
122502946
610374658
956230507
379002193
722484005
1299818353
-1370045995
-743873488
1826067517
--- Process 20596 thread 21820 exited with status 0x0
--- Process 20596 thread 15588 exited with status 0x0
// ... more threads exited
--- Process 20596 exited with status 0x0
```

The program:

```c
#include <stdio.h>
#include <omp.h>
#include <stdlib.h>

#define n 16000
int main(void) {
    int L[n][n];
    int X[n];
    int Y[n];
    double start_time, end_time;

    omp_set_num_threads(16);

    start_time = omp_get_wtime();
    // init fixed seed
    srand(1);

    // init L, X
    for (int i = 0; i < n; i++) {
        X[i] = rand();
        for (int j = 0; j <= i; j++) {
            L[i][j] = rand();
        }
        Y[i] = 0;
    }

    #pragma omp parallel for schedule(static)
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            Y[i] += L[i][j] * X[j];
        }
    }

    end_time = omp_get_wtime();
    printf("Time taken: %f seconds\n", end_time - start_time);

    // Visualize the result
    for (int i = 0; i < 10; i++) {
        printf("%d\n", X[i]);
    }
    for (int i = 0; i < 10; i++) {
        for (int j = 0; j <= i; j++) {
            printf("%6d ", L[i][j]);
        }
        printf("\n");
    }
    for (int i = 0; i < 10; i++) {
        printf("%d\n", Y[i]);
    }
    return 0;
}
```

## Appendix

Compiler version:

```shell
$ gcc -v
Using built-in specs.
COLLECT_GCC=D:\Personal Data\Repositories\mingw64\bin\gcc.exe
COLLECT_LTO_WRAPPER=D:/Personal\ Data/Repositories/mingw64/bin/../libexec/gcc/x86_64-w64-mingw32/15.2.0/lto-wrapper.exe
OFFLOAD_TARGET_NAMES=nvptx-none
Target: x86_64-w64-mingw32
Configured with: ../configure --prefix=/R/winlibs_staging_ucrt64/inst_gcc-15.2.0/share/gcc --build=x86_64-w64-mingw32 --host=x86_64-w64-mingw32 --enable-offload-targets=nvptx-none --with-pkgversion='MinGW-W64 x86_64-ucrt-posix-seh, built by Brecht Sanders, r5' --with-tune=generic --enable-checking=release --enable-threads=posix --disable-sjlj-exceptions --disable-libunwind-exceptions --disable-serial-configure --disable-bootstrap --enable-host-shared --enable-plugin --disable-default-ssp --disable-rpath --disable-libstdcxx-debug --disable-version-specific-runtime-libs --disable-symvers --enable-languages=c,c++,fortran,lto,objc,obj-c++ --disable-gold --disable-nls --disable-stage1-checking --disable-win32-registry --disable-multilib --enable-ld --enable-libquadmath --enable-libada --enable-libssp --enable-libstdcxx --enable-lto --enable-fully-dynamic-string --enable-libgomp --enable-graphite --enable-mingw-wildcard --enable-libstdcxx-time --enable-libstdcxx-pch --with-mpc=/c/Prog/winlibs_staging_ucrt/custombuilt64 --with-mpfr=/c/Prog/winlibs_staging_ucrt/custombuilt64 --with-gmp=/c/Prog/winlibs_staging_ucrt/custombuilt64 --with-isl=/c/Prog/winlibs_staging_ucrt/custombuilt64 --disable-libstdcxx-backtrace --enable-install-libiberty --enable-__cxa_atexit --without-included-gettext --with-diagnostics-color=auto --enable-clocale=generic --enable-libgdiagnostics --with-libiconv --with-system-zlib --with-build-sysroot=/R/winlibs_staging_ucrt64/gcc-15.2.0/build_mingw/mingw-w64 CFLAGS='-I/c/Prog/winlibs_staging_ucrt/custombuilt64/include/libdl-win32   -march=nocona -msahf -mtune=generic -O2 -Wno-error=format' CXXFLAGS='-Wno-int-conversion  -march=nocona -msahf -mtune=generic -O2' LDFLAGS='-pthread -Wl,--no-insert-timestamp -Wl,--dynamicbase -Wl,--high-entropy-va -Wl,--nxcompat -Wl,--tsaware' LD=/c/Prog/winlibs_staging_ucrt/custombuilt64/share/binutils/bin/ld.exe
Thread model: posix
Supported LTO compression algorithms: zlib zstd
gcc version 15.2.0 (MinGW-W64 x86_64-ucrt-posix-seh, built by Brecht Sanders, r5)
```

```shell
$ gcc --version
gcc.exe (MinGW-W64 x86_64-ucrt-posix-seh, built by Brecht Sanders, r5) 15.2.0
Copyright (C) 2025 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```
