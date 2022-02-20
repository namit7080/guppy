
const development={
    name:'development',
    asset_path:'./asset',
    session_cookie_path:'hacker',
    db:'project',


    google_client_ID:'820541378039-hr5de085b3dgfora1fiit1ss8n5pi7dp.apps.googleusercontent.com',
    google_client_Secret:'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',
    google_callback_URL:'http://localhost:8000/users/auth/google/callback'
}

const production={
    name:'production'
}

module.exports=development;