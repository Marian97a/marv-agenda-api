CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY,

    client_name VARCHAR(150) NOT NULL,

    phone VARCHAR(30) NOT NULL,

    service VARCHAR(150) NOT NULL,

    date_time TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    CONSTRAINT appointments_status_check
        CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED'))
);

CREATE UNIQUE INDEX IF NOT EXISTS appointments_unique_active_datetime
ON appointments (date_time)
WHERE status <> 'CANCELLED';