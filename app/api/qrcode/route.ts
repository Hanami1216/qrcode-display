import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const apiUrl = "https://api2.iwod.cn/scanner/getEntrancePermissionInfo?timezoneOffset=-480&access_token=8d94a9d19bb141a132f774ba32dd2cfb&user_id=10931173&box_id=15493&language=zh_CN&api_version=3&appId=wx55e13b902820abdf&code=REDIS_SCANNER_6G3AT01NAQ8&isGetAllPermission=true&remarks=6&refreshTime=5&id=18781276&version=1&api_signature=9022C71C5CFF2CD68E4A6C5B3279CEC7";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) UnifiedPCMacWechat(0xf2641702) XWEB/18788",
        "xweb_xhr": "1",
        "Content-Type": "application/json",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://servicewechat.com/wx55e13b902820abdf/90/page-frame.html",
        "Accept-Language": "zh-CN,zh;q=0.9"
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "API 请求失败" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API 请求错误:", error);
    return NextResponse.json({ error: "内部服务器错误" }, { status: 500 });
  }
}
