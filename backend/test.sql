create TABLE plans(
    plan_Id INTEGER PRIMARY KEY,
    plan_Type VARCHAR(30),
    max_stg_tokens INTEGER,
    max_msg_tokens INTEGER,
    max_bots INTEGER,
)