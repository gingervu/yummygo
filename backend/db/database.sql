--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: yummygo; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE yummygo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'vi_VN.UTF-8';


ALTER DATABASE yummygo OWNER TO postgres;

\connect yummygo

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: category_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.category_enum AS ENUM (
    'Bún - Phở - Cháo',
    'Bánh Mì - Xôi',
    'Gà rán - Burger',
    'Cơm',
    'Hải sản',
    'Đồ chay',
    'Cà phê',
    'Trà sữa',
    'Tráng miệng',
    'Ăn vặt',
    'Pizza - Mì Ý',
    'Bánh Việt Nam',
    'Lẩu - Nướng'
);


ALTER TYPE public.category_enum OWNER TO postgres;

--
-- Name: day_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.day_enum AS ENUM (
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
);


ALTER TYPE public.day_enum OWNER TO postgres;

--
-- Name: driver_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.driver_status_enum AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.driver_status_enum OWNER TO postgres;

--
-- Name: item_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.item_status_enum AS ENUM (
    'available',
    'unavailable'
);


ALTER TYPE public.item_status_enum OWNER TO postgres;

--
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status_enum AS ENUM (
    'cart',
    'pending',
    'preparing',
    'delivering',
    'delivered',
    'completed',
    'cancelled'
);


ALTER TYPE public.order_status_enum OWNER TO postgres;

--
-- Name: restaurant_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.restaurant_status_enum AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.restaurant_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    admin_id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: cus_dri_chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cus_dri_chats (
    chat_id integer NOT NULL,
    customer_id integer,
    driver_id integer,
    created_at timestamp without time zone
);


ALTER TABLE public.cus_dri_chats OWNER TO postgres;

--
-- Name: cus_dri_chats_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cus_dri_chats_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cus_dri_chats_chat_id_seq OWNER TO postgres;

--
-- Name: cus_dri_chats_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cus_dri_chats_chat_id_seq OWNED BY public.cus_dri_chats.chat_id;


--
-- Name: cus_dri_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cus_dri_messages (
    message_id integer NOT NULL,
    chat_id integer,
    sender_id integer,
    message text,
    created_at timestamp without time zone
);


ALTER TABLE public.cus_dri_messages OWNER TO postgres;

--
-- Name: cus_dri_messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cus_dri_messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cus_dri_messages_message_id_seq OWNER TO postgres;

--
-- Name: cus_dri_messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cus_dri_messages_message_id_seq OWNED BY public.cus_dri_messages.message_id;


--
-- Name: cus_res_chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cus_res_chats (
    chat_id integer NOT NULL,
    customer_id integer,
    restaurant_id integer,
    created_at timestamp without time zone
);


ALTER TABLE public.cus_res_chats OWNER TO postgres;

--
-- Name: cus_res_chats_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cus_res_chats_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cus_res_chats_chat_id_seq OWNER TO postgres;

--
-- Name: cus_res_chats_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cus_res_chats_chat_id_seq OWNED BY public.cus_res_chats.chat_id;


--
-- Name: cus_res_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cus_res_messages (
    message_id integer NOT NULL,
    chat_id integer,
    sender_id integer,
    message text,
    created_at timestamp without time zone
);


ALTER TABLE public.cus_res_messages OWNER TO postgres;

--
-- Name: cus_res_messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cus_res_messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cus_res_messages_message_id_seq OWNER TO postgres;

--
-- Name: cus_res_messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cus_res_messages_message_id_seq OWNED BY public.cus_res_messages.message_id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    name text NOT NULL,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: drivers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drivers (
    driver_id integer NOT NULL,
    name text NOT NULL,
    status public.driver_status_enum DEFAULT 'inactive'::public.driver_status_enum,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.drivers OWNER TO postgres;

--
-- Name: managers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.managers (
    manager_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.managers OWNER TO postgres;

--
-- Name: managers_manager_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.managers_manager_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.managers_manager_id_seq OWNER TO postgres;

--
-- Name: managers_manager_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.managers_manager_id_seq OWNED BY public.managers.manager_id;


--
-- Name: menu_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu_items (
    item_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    name character varying NOT NULL,
    img_url text,
    description text,
    price numeric(10,2) NOT NULL,
    status public.item_status_enum DEFAULT 'unavailable'::public.item_status_enum,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.menu_items OWNER TO postgres;

--
-- Name: menu_items_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_items_item_id_seq OWNER TO postgres;

--
-- Name: menu_items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_items_item_id_seq OWNED BY public.menu_items.item_id;


--
-- Name: merchants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.merchants (
    merchant_id integer NOT NULL,
    name text NOT NULL,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.merchants OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    item_id integer NOT NULL,
    order_id integer NOT NULL,
    price numeric(10,2),
    quantity integer DEFAULT 1
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    customer_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    driver_id integer,
    address text,
    delivery_fee numeric(10,2),
    food_fee numeric(10,2),
    order_status public.order_status_enum DEFAULT 'cart'::public.order_status_enum,
    created_at timestamp without time zone,
    delivered_at timestamp without time zone,
    note text,
    distance numeric(10,1),
    x numeric(10,7),
    y numeric(10,7)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: res_dri_chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.res_dri_chats (
    chat_id integer NOT NULL,
    restaurant_id integer,
    driver_id integer,
    created_at timestamp without time zone
);


ALTER TABLE public.res_dri_chats OWNER TO postgres;

--
-- Name: res_dri_chats_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.res_dri_chats_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.res_dri_chats_chat_id_seq OWNER TO postgres;

--
-- Name: res_dri_chats_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.res_dri_chats_chat_id_seq OWNED BY public.res_dri_chats.chat_id;


--
-- Name: res_dri_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.res_dri_messages (
    message_id integer NOT NULL,
    chat_id integer,
    sender_id integer,
    message text,
    created_at timestamp without time zone
);


ALTER TABLE public.res_dri_messages OWNER TO postgres;

--
-- Name: res_dri_messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.res_dri_messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.res_dri_messages_message_id_seq OWNER TO postgres;

--
-- Name: res_dri_messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.res_dri_messages_message_id_seq OWNED BY public.res_dri_messages.message_id;


--
-- Name: restaurant_times; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurant_times (
    restaurant_id integer NOT NULL,
    day public.day_enum NOT NULL,
    open_time time without time zone NOT NULL,
    close_time time without time zone NOT NULL
);


ALTER TABLE public.restaurant_times OWNER TO postgres;

--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurants (
    restaurant_id integer NOT NULL,
    name text NOT NULL,
    category public.category_enum,
    address text,
    status public.restaurant_status_enum DEFAULT 'inactive'::public.restaurant_status_enum,
    is_deleted boolean DEFAULT false,
    x numeric(10,7),
    y numeric(10,7)
);


ALTER TABLE public.restaurants OWNER TO postgres;

--
-- Name: restaurants_restaurant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.restaurants_restaurant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.restaurants_restaurant_id_seq OWNER TO postgres;

--
-- Name: restaurants_restaurant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.restaurants_restaurant_id_seq OWNED BY public.restaurants.restaurant_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying NOT NULL,
    password character varying NOT NULL,
    phone character varying,
    email character varying,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: cus_dri_chats chat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_dri_chats ALTER COLUMN chat_id SET DEFAULT nextval('public.cus_dri_chats_chat_id_seq'::regclass);


--
-- Name: cus_dri_messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_dri_messages ALTER COLUMN message_id SET DEFAULT nextval('public.cus_dri_messages_message_id_seq'::regclass);


--
-- Name: cus_res_chats chat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_res_chats ALTER COLUMN chat_id SET DEFAULT nextval('public.cus_res_chats_chat_id_seq'::regclass);


--
-- Name: cus_res_messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_res_messages ALTER COLUMN message_id SET DEFAULT nextval('public.cus_res_messages_message_id_seq'::regclass);


--
-- Name: managers manager_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managers ALTER COLUMN manager_id SET DEFAULT nextval('public.managers_manager_id_seq'::regclass);


--
-- Name: menu_items item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_items ALTER COLUMN item_id SET DEFAULT nextval('public.menu_items_item_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: res_dri_chats chat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.res_dri_chats ALTER COLUMN chat_id SET DEFAULT nextval('public.res_dri_chats_chat_id_seq'::regclass);


--
-- Name: res_dri_messages message_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.res_dri_messages ALTER COLUMN message_id SET DEFAULT nextval('public.res_dri_messages_message_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (admin_id, name) FROM stdin;
\.


--
-- Data for Name: cus_dri_chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cus_dri_chats (chat_id, customer_id, driver_id, created_at) FROM stdin;
\.


--
-- Data for Name: cus_dri_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cus_dri_messages (message_id, chat_id, sender_id, message, created_at) FROM stdin;
\.


--
-- Data for Name: cus_res_chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cus_res_chats (chat_id, customer_id, restaurant_id, created_at) FROM stdin;
\.


--
-- Data for Name: cus_res_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cus_res_messages (message_id, chat_id, sender_id, message, created_at) FROM stdin;
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (customer_id, name, is_deleted) FROM stdin;
1	Customer 1	f
2	Customer 2	f
3	Customer 3	f
4	Customer 4	f
5	Customer 5	f
6	Customer 6	f
7	Customer 7	f
8	Customer 8	f
9	Customer 9	f
10	Customer 10	f
11	Customer 11	f
12	Customer 12	f
13	Customer 13	f
14	Customer 14	f
15	Customer 15	f
16	Customer 16	f
17	Customer 17	f
18	Customer 18	f
19	Customer 19	f
20	Customer 20	f
21	Customer 21	f
22	Customer 22	f
23	Customer 23	f
24	Customer 24	f
25	Customer 25	f
26	Customer 26	f
27	Customer 27	f
28	Customer 28	f
29	Customer 29	f
30	Customer 30	f
31	Customer 31	f
32	Customer 32	f
33	Customer 33	f
34	Customer 34	f
35	Customer 35	f
36	Customer 36	f
37	Customer 37	f
38	Customer 38	f
39	Customer 39	f
40	Customer 40	f
41	Customer 41	f
42	Customer 42	f
43	Customer 43	f
44	Customer 44	f
45	Customer 45	f
46	Customer 46	f
47	Customer 47	f
48	Customer 48	f
49	Customer 49	f
50	Customer 50	f
51	Customer 51	f
52	Customer 52	f
53	Customer 53	f
54	Customer 54	f
55	Customer 55	f
56	Customer 56	f
57	Customer 57	f
58	Customer 58	f
59	Customer 59	f
60	Customer 60	f
61	Customer 61	f
62	Customer 62	f
63	Customer 63	f
64	Customer 64	f
65	Customer 65	f
66	Customer 66	f
67	Customer 67	f
68	Customer 68	f
69	Customer 69	f
70	Customer 70	f
71	Customer 71	f
72	Customer 72	f
73	Customer 73	f
74	Customer 74	f
75	Customer 75	f
76	Customer 76	f
77	Customer 77	f
78	Customer 78	f
79	Customer 79	f
80	Customer 80	f
81	Customer 81	f
82	Customer 82	f
83	Customer 83	f
84	Customer 84	f
85	Customer 85	f
86	Customer 86	f
87	Customer 87	f
88	Customer 88	f
89	Customer 89	f
90	Customer 90	f
91	Customer 91	f
92	Customer 92	f
93	Customer 93	f
94	Customer 94	f
95	Customer 95	f
96	Customer 96	f
97	Customer 97	f
98	Customer 98	f
99	Customer 99	f
100	Customer 100	f
101	Customer 101	f
102	Customer 102	f
103	Customer 103	f
104	Customer 104	f
105	Customer 105	f
106	Customer 106	f
107	Customer 107	f
108	Customer 108	f
109	Customer 109	f
110	Customer 110	f
111	Customer 111	f
112	Customer 112	f
113	Customer 113	f
114	Customer 114	f
115	Customer 115	f
116	Customer 116	f
117	Customer 117	f
118	Customer 118	f
119	Customer 119	f
120	Customer 120	f
121	Customer 121	f
122	Customer 122	f
123	Customer 123	f
124	Customer 124	f
125	Customer 125	f
126	Customer 126	f
127	Customer 127	f
128	Customer 128	f
129	Customer 129	f
130	Customer 130	f
131	Customer 131	f
132	Customer 132	f
133	Customer 133	f
134	Customer 134	f
135	Customer 135	f
136	Customer 136	f
137	Customer 137	f
138	Customer 138	f
139	Customer 139	f
140	Customer 140	f
141	Customer 141	f
142	Customer 142	f
143	Customer 143	f
144	Customer 144	f
145	Customer 145	f
146	Customer 146	f
147	Customer 147	f
148	Customer 148	f
149	Customer 149	f
150	Customer 150	f
151	Customer 151	f
152	Customer 152	f
153	Customer 153	f
154	Customer 154	f
155	Customer 155	f
156	Customer 156	f
157	Customer 157	f
158	Customer 158	f
159	Customer 159	f
160	Customer 160	f
161	Customer 161	f
162	Customer 162	f
163	Customer 163	f
164	Customer 164	f
165	Customer 165	f
166	Customer 166	f
167	Customer 167	f
168	Customer 168	f
169	Customer 169	f
170	Customer 170	f
171	Customer 171	f
172	Customer 172	f
173	Customer 173	f
174	Customer 174	f
175	Customer 175	f
176	Customer 176	f
177	Customer 177	f
178	Customer 178	f
179	Customer 179	f
180	Customer 180	f
181	Customer 181	f
182	Customer 182	f
183	Customer 183	f
184	Customer 184	f
185	Customer 185	f
186	Customer 186	f
187	Customer 187	f
188	Customer 188	f
189	Customer 189	f
190	Customer 190	f
191	Customer 191	f
192	Customer 192	f
193	Customer 193	f
194	Customer 194	f
195	Customer 195	f
196	Customer 196	f
197	Customer 197	f
198	Customer 198	f
199	Customer 199	f
200	Customer 200	f
211	Ginger	f
212	Ginger1	f
213	Ginger2	f
\.


--
-- Data for Name: drivers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.drivers (driver_id, name, status, is_deleted) FROM stdin;
35	Driver 35	active	f
40	Driver 40	inactive	f
30	Driver 30	inactive	f
31	Driver 31	inactive	f
34	Driver 34	inactive	f
37	Driver 37	inactive	f
38	Driver 38	inactive	f
39	Driver 39	inactive	f
61	Driver 61	inactive	f
62	Driver 62	inactive	f
63	Driver 63	inactive	f
64	Driver 64	inactive	f
77	Driver 77	inactive	f
78	Driver 78	inactive	f
79	Driver 79	inactive	f
80	Driver 80	inactive	f
81	Driver 81	inactive	f
82	Driver 82	inactive	f
83	Driver 83	inactive	f
84	Driver 84	inactive	f
85	Driver 85	inactive	f
93	Driver 93	inactive	f
94	Driver 94	inactive	f
95	Driver 95	inactive	f
96	Driver 96	inactive	f
98	Driver 98	inactive	f
115	Driver 115	inactive	f
116	Driver 116	inactive	f
117	Driver 117	inactive	f
118	Driver 118	inactive	f
122	Driver 122	inactive	f
123	Driver 123	inactive	f
125	Driver 125	inactive	f
46	Driver 46	inactive	f
58	Driver 58	inactive	f
55	Driver 55	inactive	f
43	Driver 43	active	f
45	Driver 45	active	f
47	Driver 47	active	f
48	Driver 48	active	f
49	Driver 49	active	f
50	Driver 50	active	f
51	Driver 51	active	f
52	Driver 52	active	f
53	Driver 53	active	f
54	Driver 54	active	f
56	Driver 56	active	f
60	Driver 60	active	f
211	Ginger As Driver	inactive	f
57	Ginger Driver	active	f
59	Driver 59	inactive	f
216	Sans Espoir	inactive	f
42	Driver 42	inactive	f
44	Driver 44	inactive	f
41	Driver 41	inactive	f
\.


--
-- Data for Name: managers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.managers (manager_id, restaurant_id, username, password, name) FROM stdin;
1	1	manager1	123456	Manager 1
2	2	manager2	123456	Manager 2
3	3	manager3	123456	Manager 3
4	4	manager4	123456	Manager 4
5	5	manager5	123456	Manager 5
6	6	manager6	123456	Manager 6
7	7	manager7	123456	Manager 7
8	8	manager8	123456	Manager 8
9	9	manager9	123456	Manager 9
10	10	manager10	123456	Manager 10
11	11	manager11	123456	Manager 11
12	12	manager12	123456	Manager 12
13	13	manager13	123456	Manager 13
14	14	manager14	123456	Manager 14
15	15	manager15	123456	Manager 15
16	16	manager16	123456	Manager 16
17	17	manager17	123456	Manager 17
18	18	manager18	123456	Manager 18
19	19	manager19	123456	Manager 19
20	20	manager20	123456	Manager 20
21	21	manager21	123456	Manager 21
22	22	manager22	123456	Manager 22
24	24	manager24	123456	Manager 24
25	25	manager25	123456	Manager 25
26	26	manager26	123456	Manager 26
27	27	manager27	123456	Manager 27
28	28	manager28	123456	Manager 28
29	29	manager29	123456	Manager 29
30	30	manager30	123456	Manager 30
31	31	manager31	123456	Manager 31
32	32	manager32	123456	Manager 32
33	33	manager33	123456	Manager 33
34	34	manager34	123456	Manager 34
35	35	manager35	123456	Manager 35
36	36	manager36	123456	Manager 36
37	37	manager37	123456	Manager 37
38	38	manager38	123456	Manager 38
39	39	manager39	123456	Manager 39
40	40	manager40	123456	Manager 40
41	41	manager41	123456	Manager 41
42	42	manager42	123456	Manager 42
43	43	manager43	123456	Manager 43
44	44	manager44	123456	Manager 44
45	45	manager45	123456	Manager 45
46	46	manager46	123456	Manager 46
47	47	manager47	123456	Manager 47
48	48	manager48	123456	Manager 48
49	49	manager49	123456	Manager 49
50	50	manager50	123456	Manager 50
51	51	manager51	123456	Manager 51
52	52	manager52	123456	Manager 52
53	53	manager53	123456	Manager 53
54	54	manager54	123456	Manager 54
55	55	manager55	123456	Manager 55
56	56	manager56	123456	Manager 56
57	57	manager57	123456	Manager 57
58	58	manager58	123456	Manager 58
59	59	manager59	123456	Manager 59
60	60	manager60	123456	Manager 60
61	61	manager61	123456	Manager 61
62	62	manager62	123456	Manager 62
63	63	manager63	123456	Manager 63
64	64	manager64	123456	Manager 64
65	65	manager65	123456	Manager 65
66	66	manager66	123456	Manager 66
67	67	manager67	123456	Manager 67
68	68	manager68	123456	Manager 68
69	69	manager69	123456	Manager 69
70	70	manager70	123456	Manager 70
71	71	manager71	123456	Manager 71
72	72	manager72	123456	Manager 72
73	73	manager73	123456	Manager 73
74	74	manager74	123456	Manager 74
75	75	manager75	123456	Manager 75
76	76	manager76	123456	Manager 76
77	77	manager77	123456	Manager 77
78	78	manager78	123456	Manager 78
79	79	manager79	123456	Manager 79
80	80	manager80	123456	Manager 80
81	81	manager81	123456	Manager 81
82	82	manager82	123456	Manager 82
83	83	manager83	123456	Manager 83
84	84	manager84	123456	Manager 84
85	85	manager85	123456	Manager 85
86	86	manager86	123456	Manager 86
87	87	manager87	123456	Manager 87
88	88	manager88	123456	Manager 88
89	89	manager89	123456	Manager 89
90	90	manager90	123456	Manager 90
91	91	manager91	123456	Manager 91
92	92	manager92	123456	Manager 92
93	93	manager93	123456	Manager 93
94	94	manager94	123456	Manager 94
95	95	manager95	123456	Manager 95
96	96	manager96	123456	Manager 96
97	97	manager97	123456	Manager 97
98	98	manager98	123456	Manager 98
99	99	manager99	123456	Manager 99
100	100	manager100	123456	Manager 100
101	101	manager101	123456	Manager 101
102	102	manager102	123456	Manager 102
103	103	manager103	123456	Manager 103
104	104	manager104	123456	Manager 104
105	105	manager105	123456	Manager 105
106	106	manager106	123456	Manager 106
107	107	manager107	123456	Manager 107
108	108	manager108	123456	Manager 108
109	109	manager109	123456	Manager 109
110	110	manager110	123456	Manager 110
111	111	manager111	123456	Manager 111
112	112	manager112	123456	Manager 112
113	113	manager113	123456	Manager 113
114	114	manager114	123456	Manager 114
115	115	manager115	123456	Manager 115
116	116	manager116	123456	Manager 116
117	117	manager117	123456	Manager 117
118	118	manager118	123456	Manager 118
119	119	manager119	123456	Manager 119
120	120	manager120	123456	Manager 120
121	121	manager121	123456	Manager 121
122	122	manager122	123456	Manager 122
123	123	manager123	123456	Manager 123
124	124	manager124	123456	Manager 124
125	125	manager125	123456	Manager 125
126	126	manager126	123456	Manager 126
127	127	manager127	123456	Manager 127
128	128	manager128	123456	Manager 128
129	129	manager129	123456	Manager 129
130	130	manager130	123456	Manager 130
131	131	manager131	123456	Manager 131
132	132	manager132	123456	Manager 132
133	133	manager133	123456	Manager 133
134	134	manager134	123456	Manager 134
135	135	manager135	123456	Manager 135
136	136	manager136	123456	Manager 136
137	137	manager137	123456	Manager 137
138	138	manager138	123456	Manager 138
139	139	manager139	123456	Manager 139
140	140	manager140	123456	Manager 140
141	141	manager141	123456	Manager 141
142	142	manager142	123456	Manager 142
143	143	manager143	123456	Manager 143
144	144	manager144	123456	Manager 144
145	145	manager145	123456	Manager 145
146	146	manager146	123456	Manager 146
147	147	manager147	123456	Manager 147
148	148	manager148	123456	Manager 148
149	149	manager149	123456	Manager 149
150	150	manager150	123456	Manager 150
151	151	manager151	123456	Manager 151
152	152	manager152	123456	Manager 152
153	153	manager153	123456	Manager 153
154	154	manager154	123456	Manager 154
155	155	manager155	123456	Manager 155
156	156	manager156	123456	Manager 156
157	157	manager157	123456	Manager 157
158	158	manager158	123456	Manager 158
159	159	manager159	123456	Manager 159
160	160	manager160	123456	Manager 160
161	161	manager161	123456	Manager 161
162	162	manager162	123456	Manager 162
163	163	manager163	123456	Manager 163
164	164	manager164	123456	Manager 164
165	165	manager165	123456	Manager 165
166	166	manager166	123456	Manager 166
167	167	manager167	123456	Manager 167
168	168	manager168	123456	Manager 168
169	169	manager169	123456	Manager 169
170	170	manager170	123456	Manager 170
171	171	manager171	123456	Manager 171
172	172	manager172	123456	Manager 172
173	173	manager173	123456	Manager 173
174	174	manager174	123456	Manager 174
175	175	manager175	123456	Manager 175
176	176	manager176	123456	Manager 176
177	177	manager177	123456	Manager 177
178	178	manager178	123456	Manager 178
179	179	manager179	123456	Manager 179
180	180	manager180	123456	Manager 180
181	181	manager181	123456	Manager 181
182	182	manager182	123456	Manager 182
183	183	manager183	123456	Manager 183
184	184	manager184	123456	Manager 184
185	185	manager185	123456	Manager 185
186	186	manager186	123456	Manager 186
187	187	manager187	123456	Manager 187
188	188	manager188	123456	Manager 188
189	189	manager189	123456	Manager 189
190	190	manager190	123456	Manager 190
191	191	manager191	123456	Manager 191
192	192	manager192	123456	Manager 192
193	193	manager193	123456	Manager 193
194	194	manager194	123456	Manager 194
195	195	manager195	123456	Manager 195
196	196	manager196	123456	Manager 196
197	197	manager197	123456	Manager 197
198	198	manager198	123456	Manager 198
199	199	manager199	123456	Manager 199
200	200	manager200	123456	Manager 200
\.


--
-- Data for Name: menu_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu_items (item_id, restaurant_id, name, img_url, description, price, status, is_deleted) FROM stdin;
2016	215	Matcha ChaCha	\N	Xin đừng trượt web	123456.00	unavailable	f
1	1	Món 1	\N	\N	15000.00	available	f
241	25	Món 1	\N	\N	15000.00	unavailable	f
137	14	Món 7	\N	\N	30000.00	available	f
2	1	Món 2	\N	\N	40000.00	available	f
3	1	Món 3	\N	\N	20000.00	available	f
4	1	Món 4	\N	\N	40000.00	available	f
5	1	Món 5	\N	\N	10000.00	available	f
6	1	Món 6	\N	\N	20000.00	available	f
7	1	Món 7	\N	\N	10000.00	available	f
8	1	Món 8	\N	\N	50000.00	available	f
9	1	Món 9	\N	\N	25000.00	available	f
10	1	Món 10	\N	\N	10000.00	available	f
11	2	Món 1	\N	\N	25000.00	available	f
12	2	Món 2	\N	\N	40000.00	available	f
13	2	Món 3	\N	\N	15000.00	available	f
14	2	Món 4	\N	\N	50000.00	available	f
15	2	Món 5	\N	\N	50000.00	available	f
16	2	Món 6	\N	\N	50000.00	available	f
17	2	Món 7	\N	\N	25000.00	available	f
18	2	Món 8	\N	\N	30000.00	available	f
19	2	Món 9	\N	\N	10000.00	available	f
20	2	Món 10	\N	\N	30000.00	available	f
21	3	Món 1	\N	\N	45000.00	available	f
22	3	Món 2	\N	\N	35000.00	available	f
23	3	Món 3	\N	\N	35000.00	available	f
24	3	Món 4	\N	\N	10000.00	available	f
25	3	Món 5	\N	\N	15000.00	available	f
26	3	Món 6	\N	\N	35000.00	available	f
27	3	Món 7	\N	\N	45000.00	available	f
28	3	Món 8	\N	\N	20000.00	available	f
29	3	Món 9	\N	\N	35000.00	available	f
30	3	Món 10	\N	\N	15000.00	available	f
31	4	Món 1	\N	\N	30000.00	available	f
32	4	Món 2	\N	\N	10000.00	available	f
33	4	Món 3	\N	\N	20000.00	available	f
34	4	Món 4	\N	\N	45000.00	available	f
35	4	Món 5	\N	\N	15000.00	available	f
36	4	Món 6	\N	\N	45000.00	available	f
37	4	Món 7	\N	\N	15000.00	available	f
38	4	Món 8	\N	\N	50000.00	available	f
39	4	Món 9	\N	\N	50000.00	available	f
40	4	Món 10	\N	\N	25000.00	available	f
41	5	Món 1	\N	\N	50000.00	available	f
42	5	Món 2	\N	\N	20000.00	available	f
43	5	Món 3	\N	\N	45000.00	available	f
44	5	Món 4	\N	\N	15000.00	available	f
45	5	Món 5	\N	\N	50000.00	available	f
46	5	Món 6	\N	\N	20000.00	available	f
47	5	Món 7	\N	\N	30000.00	available	f
48	5	Món 8	\N	\N	20000.00	available	f
49	5	Món 9	\N	\N	50000.00	available	f
50	5	Món 10	\N	\N	25000.00	available	f
51	6	Món 1	\N	\N	20000.00	available	f
52	6	Món 2	\N	\N	20000.00	available	f
53	6	Món 3	\N	\N	35000.00	available	f
54	6	Món 4	\N	\N	10000.00	available	f
55	6	Món 5	\N	\N	45000.00	available	f
56	6	Món 6	\N	\N	50000.00	available	f
57	6	Món 7	\N	\N	25000.00	available	f
58	6	Món 8	\N	\N	40000.00	available	f
59	6	Món 9	\N	\N	35000.00	available	f
60	6	Món 10	\N	\N	50000.00	available	f
61	7	Món 1	\N	\N	45000.00	available	f
62	7	Món 2	\N	\N	30000.00	available	f
63	7	Món 3	\N	\N	25000.00	available	f
64	7	Món 4	\N	\N	40000.00	available	f
65	7	Món 5	\N	\N	30000.00	available	f
66	7	Món 6	\N	\N	30000.00	available	f
67	7	Món 7	\N	\N	15000.00	available	f
68	7	Món 8	\N	\N	45000.00	available	f
69	7	Món 9	\N	\N	20000.00	available	f
70	7	Món 10	\N	\N	50000.00	available	f
81	9	Món 1	\N	\N	40000.00	available	f
82	9	Món 2	\N	\N	40000.00	available	f
83	9	Món 3	\N	\N	50000.00	available	f
84	9	Món 4	\N	\N	45000.00	available	f
85	9	Món 5	\N	\N	40000.00	available	f
86	9	Món 6	\N	\N	50000.00	available	f
87	9	Món 7	\N	\N	10000.00	available	f
88	9	Món 8	\N	\N	25000.00	available	f
89	9	Món 9	\N	\N	35000.00	available	f
90	9	Món 10	\N	\N	50000.00	available	f
91	10	Món 1	\N	\N	25000.00	available	f
92	10	Món 2	\N	\N	20000.00	available	f
93	10	Món 3	\N	\N	25000.00	available	f
94	10	Món 4	\N	\N	15000.00	available	f
95	10	Món 5	\N	\N	40000.00	available	f
96	10	Món 6	\N	\N	10000.00	available	f
97	10	Món 7	\N	\N	45000.00	available	f
98	10	Món 8	\N	\N	50000.00	available	f
99	10	Món 9	\N	\N	40000.00	available	f
100	10	Món 10	\N	\N	45000.00	available	f
101	11	Món 1	\N	\N	10000.00	available	f
102	11	Món 2	\N	\N	30000.00	available	f
103	11	Món 3	\N	\N	35000.00	available	f
104	11	Món 4	\N	\N	40000.00	available	f
105	11	Món 5	\N	\N	15000.00	available	f
106	11	Món 6	\N	\N	10000.00	available	f
107	11	Món 7	\N	\N	50000.00	available	f
108	11	Món 8	\N	\N	45000.00	available	f
109	11	Món 9	\N	\N	35000.00	available	f
110	11	Món 10	\N	\N	50000.00	available	f
111	12	Món 1	\N	\N	30000.00	available	f
112	12	Món 2	\N	\N	10000.00	available	f
113	12	Món 3	\N	\N	25000.00	available	f
114	12	Món 4	\N	\N	40000.00	available	f
115	12	Món 5	\N	\N	35000.00	available	f
116	12	Món 6	\N	\N	15000.00	available	f
117	12	Món 7	\N	\N	25000.00	available	f
118	12	Món 8	\N	\N	25000.00	available	f
119	12	Món 9	\N	\N	20000.00	available	f
120	12	Món 10	\N	\N	20000.00	available	f
121	13	Món 1	\N	\N	30000.00	available	f
122	13	Món 2	\N	\N	45000.00	available	f
123	13	Món 3	\N	\N	20000.00	available	f
124	13	Món 4	\N	\N	40000.00	available	f
125	13	Món 5	\N	\N	20000.00	available	f
126	13	Món 6	\N	\N	45000.00	available	f
127	13	Món 7	\N	\N	40000.00	available	f
128	13	Món 8	\N	\N	40000.00	available	f
129	13	Món 9	\N	\N	15000.00	available	f
130	13	Món 10	\N	\N	30000.00	available	f
131	14	Món 1	\N	\N	50000.00	available	f
132	14	Món 2	\N	\N	10000.00	available	f
133	14	Món 3	\N	\N	10000.00	available	f
134	14	Món 4	\N	\N	30000.00	available	f
135	14	Món 5	\N	\N	25000.00	available	f
136	14	Món 6	\N	\N	30000.00	available	f
72	8	Món 2	\N	\N	25000.00	available	t
73	8	Món 3	\N	\N	35000.00	available	t
75	8	Món 5	\N	\N	25000.00	available	t
76	8	Món 6	\N	\N	15000.00	available	t
77	8	Món 7	\N	\N	40000.00	available	t
78	8	Món 8	\N	\N	35000.00	available	t
79	8	Món 9	\N	\N	40000.00	available	t
80	8	Món 10	\N	\N	40000.00	available	t
138	14	Món 8	\N	\N	35000.00	available	f
139	14	Món 9	\N	\N	50000.00	available	f
140	14	Món 10	\N	\N	30000.00	available	f
141	15	Món 1	\N	\N	25000.00	available	f
142	15	Món 2	\N	\N	35000.00	available	f
143	15	Món 3	\N	\N	25000.00	available	f
144	15	Món 4	\N	\N	25000.00	available	f
145	15	Món 5	\N	\N	40000.00	available	f
146	15	Món 6	\N	\N	15000.00	available	f
147	15	Món 7	\N	\N	10000.00	available	f
148	15	Món 8	\N	\N	35000.00	available	f
149	15	Món 9	\N	\N	35000.00	available	f
150	15	Món 10	\N	\N	25000.00	available	f
151	16	Món 1	\N	\N	35000.00	available	f
152	16	Món 2	\N	\N	10000.00	available	f
153	16	Món 3	\N	\N	10000.00	available	f
154	16	Món 4	\N	\N	50000.00	available	f
155	16	Món 5	\N	\N	10000.00	available	f
156	16	Món 6	\N	\N	45000.00	available	f
157	16	Món 7	\N	\N	15000.00	available	f
158	16	Món 8	\N	\N	40000.00	available	f
159	16	Món 9	\N	\N	30000.00	available	f
160	16	Món 10	\N	\N	40000.00	available	f
161	17	Món 1	\N	\N	25000.00	available	f
162	17	Món 2	\N	\N	50000.00	available	f
163	17	Món 3	\N	\N	45000.00	available	f
164	17	Món 4	\N	\N	35000.00	available	f
165	17	Món 5	\N	\N	20000.00	available	f
166	17	Món 6	\N	\N	25000.00	available	f
167	17	Món 7	\N	\N	50000.00	available	f
168	17	Món 8	\N	\N	25000.00	available	f
169	17	Món 9	\N	\N	25000.00	available	f
170	17	Món 10	\N	\N	20000.00	available	f
171	18	Món 1	\N	\N	40000.00	available	f
172	18	Món 2	\N	\N	45000.00	available	f
173	18	Món 3	\N	\N	30000.00	available	f
174	18	Món 4	\N	\N	30000.00	available	f
175	18	Món 5	\N	\N	35000.00	available	f
176	18	Món 6	\N	\N	40000.00	available	f
177	18	Món 7	\N	\N	45000.00	available	f
178	18	Món 8	\N	\N	45000.00	available	f
179	18	Món 9	\N	\N	40000.00	available	f
180	18	Món 10	\N	\N	50000.00	available	f
183	19	Món 3	\N	\N	45000.00	available	f
184	19	Món 4	\N	\N	35000.00	available	f
185	19	Món 5	\N	\N	45000.00	available	f
186	19	Món 6	\N	\N	20000.00	available	f
187	19	Món 7	\N	\N	50000.00	available	f
188	19	Món 8	\N	\N	40000.00	available	f
190	19	Món 10	\N	\N	45000.00	available	f
191	20	Món 1	\N	\N	30000.00	available	f
192	20	Món 2	\N	\N	40000.00	available	f
193	20	Món 3	\N	\N	35000.00	available	f
194	20	Món 4	\N	\N	50000.00	available	f
195	20	Món 5	\N	\N	15000.00	available	f
196	20	Món 6	\N	\N	25000.00	available	f
197	20	Món 7	\N	\N	35000.00	available	f
198	20	Món 8	\N	\N	50000.00	available	f
199	20	Món 9	\N	\N	15000.00	available	f
200	20	Món 10	\N	\N	45000.00	available	f
201	21	Món 1	\N	\N	25000.00	available	f
202	21	Món 2	\N	\N	35000.00	available	f
203	21	Món 3	\N	\N	35000.00	available	f
204	21	Món 4	\N	\N	50000.00	available	f
205	21	Món 5	\N	\N	40000.00	available	f
206	21	Món 6	\N	\N	10000.00	available	f
207	21	Món 7	\N	\N	35000.00	available	f
208	21	Món 8	\N	\N	15000.00	available	f
209	21	Món 9	\N	\N	35000.00	available	f
210	21	Món 10	\N	\N	15000.00	available	f
211	22	Món 1	\N	\N	25000.00	available	f
212	22	Món 2	\N	\N	20000.00	available	f
213	22	Món 3	\N	\N	45000.00	available	f
214	22	Món 4	\N	\N	35000.00	available	f
215	22	Món 5	\N	\N	35000.00	available	f
216	22	Món 6	\N	\N	35000.00	available	f
217	22	Món 7	\N	\N	40000.00	available	f
218	22	Món 8	\N	\N	40000.00	available	f
219	22	Món 9	\N	\N	40000.00	available	f
220	22	Món 10	\N	\N	40000.00	available	f
231	24	Món 1	\N	\N	50000.00	available	f
232	24	Món 2	\N	\N	10000.00	available	f
233	24	Món 3	\N	\N	35000.00	available	f
234	24	Món 4	\N	\N	35000.00	available	f
235	24	Món 5	\N	\N	40000.00	available	f
236	24	Món 6	\N	\N	30000.00	available	f
237	24	Món 7	\N	\N	30000.00	available	f
238	24	Món 8	\N	\N	35000.00	available	f
239	24	Món 9	\N	\N	35000.00	available	f
240	24	Món 10	\N	\N	10000.00	available	f
242	25	Món 2	\N	\N	10000.00	available	f
243	25	Món 3	\N	\N	20000.00	available	f
244	25	Món 4	\N	\N	25000.00	available	f
245	25	Món 5	\N	\N	10000.00	available	f
246	25	Món 6	\N	\N	30000.00	available	f
247	25	Món 7	\N	\N	25000.00	available	f
248	25	Món 8	\N	\N	50000.00	available	f
249	25	Món 9	\N	\N	45000.00	available	f
250	25	Món 10	\N	\N	15000.00	available	f
251	26	Món 1	\N	\N	20000.00	available	f
252	26	Món 2	\N	\N	40000.00	available	f
253	26	Món 3	\N	\N	45000.00	available	f
254	26	Món 4	\N	\N	35000.00	available	f
255	26	Món 5	\N	\N	10000.00	available	f
256	26	Món 6	\N	\N	10000.00	available	f
257	26	Món 7	\N	\N	45000.00	available	f
258	26	Món 8	\N	\N	50000.00	available	f
259	26	Món 9	\N	\N	45000.00	available	f
260	26	Món 10	\N	\N	15000.00	available	f
261	27	Món 1	\N	\N	30000.00	available	f
262	27	Món 2	\N	\N	15000.00	available	f
263	27	Món 3	\N	\N	40000.00	available	f
264	27	Món 4	\N	\N	10000.00	available	f
265	27	Món 5	\N	\N	20000.00	available	f
266	27	Món 6	\N	\N	10000.00	available	f
267	27	Món 7	\N	\N	20000.00	available	f
268	27	Món 8	\N	\N	50000.00	available	f
269	27	Món 9	\N	\N	25000.00	available	f
270	27	Món 10	\N	\N	20000.00	available	f
271	28	Món 1	\N	\N	50000.00	available	f
272	28	Món 2	\N	\N	50000.00	available	f
273	28	Món 3	\N	\N	25000.00	available	f
274	28	Món 4	\N	\N	40000.00	available	f
275	28	Món 5	\N	\N	40000.00	available	f
276	28	Món 6	\N	\N	40000.00	available	f
277	28	Món 7	\N	\N	20000.00	available	f
278	28	Món 8	\N	\N	50000.00	available	f
279	28	Món 9	\N	\N	40000.00	available	f
280	28	Món 10	\N	\N	25000.00	available	f
281	29	Món 1	\N	\N	20000.00	available	f
282	29	Món 2	\N	\N	50000.00	available	f
182	19	Chả cá đặc biệt	\N	\N	50000.00	available	f
283	29	Món 3	\N	\N	15000.00	available	f
284	29	Món 4	\N	\N	50000.00	available	f
285	29	Món 5	\N	\N	40000.00	available	f
286	29	Món 6	\N	\N	15000.00	available	f
287	29	Món 7	\N	\N	35000.00	available	f
288	29	Món 8	\N	\N	10000.00	available	f
289	29	Món 9	\N	\N	50000.00	available	f
290	29	Món 10	\N	\N	40000.00	available	f
291	30	Món 1	\N	\N	15000.00	available	f
292	30	Món 2	\N	\N	40000.00	available	f
293	30	Món 3	\N	\N	45000.00	available	f
294	30	Món 4	\N	\N	10000.00	available	f
295	30	Món 5	\N	\N	50000.00	available	f
296	30	Món 6	\N	\N	35000.00	available	f
297	30	Món 7	\N	\N	45000.00	available	f
298	30	Món 8	\N	\N	40000.00	available	f
299	30	Món 9	\N	\N	40000.00	available	f
300	30	Món 10	\N	\N	15000.00	available	f
301	31	Món 1	\N	\N	20000.00	available	f
302	31	Món 2	\N	\N	10000.00	available	f
303	31	Món 3	\N	\N	25000.00	available	f
304	31	Món 4	\N	\N	45000.00	available	f
305	31	Món 5	\N	\N	10000.00	available	f
306	31	Món 6	\N	\N	25000.00	available	f
307	31	Món 7	\N	\N	30000.00	available	f
308	31	Món 8	\N	\N	20000.00	available	f
309	31	Món 9	\N	\N	40000.00	available	f
310	31	Món 10	\N	\N	25000.00	available	f
311	32	Món 1	\N	\N	25000.00	available	f
312	32	Món 2	\N	\N	10000.00	available	f
313	32	Món 3	\N	\N	10000.00	available	f
314	32	Món 4	\N	\N	25000.00	available	f
315	32	Món 5	\N	\N	15000.00	available	f
316	32	Món 6	\N	\N	30000.00	available	f
317	32	Món 7	\N	\N	10000.00	available	f
318	32	Món 8	\N	\N	20000.00	available	f
319	32	Món 9	\N	\N	20000.00	available	f
320	32	Món 10	\N	\N	25000.00	available	f
321	33	Món 1	\N	\N	15000.00	available	f
322	33	Món 2	\N	\N	45000.00	available	f
323	33	Món 3	\N	\N	20000.00	available	f
324	33	Món 4	\N	\N	30000.00	available	f
325	33	Món 5	\N	\N	15000.00	available	f
326	33	Món 6	\N	\N	30000.00	available	f
327	33	Món 7	\N	\N	10000.00	available	f
328	33	Món 8	\N	\N	50000.00	available	f
329	33	Món 9	\N	\N	45000.00	available	f
330	33	Món 10	\N	\N	20000.00	available	f
331	34	Món 1	\N	\N	30000.00	available	f
332	34	Món 2	\N	\N	15000.00	available	f
333	34	Món 3	\N	\N	25000.00	available	f
334	34	Món 4	\N	\N	15000.00	available	f
335	34	Món 5	\N	\N	25000.00	available	f
336	34	Món 6	\N	\N	50000.00	available	f
337	34	Món 7	\N	\N	20000.00	available	f
338	34	Món 8	\N	\N	15000.00	available	f
339	34	Món 9	\N	\N	15000.00	available	f
340	34	Món 10	\N	\N	45000.00	available	f
341	35	Món 1	\N	\N	20000.00	available	f
342	35	Món 2	\N	\N	25000.00	available	f
343	35	Món 3	\N	\N	10000.00	available	f
344	35	Món 4	\N	\N	10000.00	available	f
345	35	Món 5	\N	\N	10000.00	available	f
346	35	Món 6	\N	\N	50000.00	available	f
347	35	Món 7	\N	\N	10000.00	available	f
348	35	Món 8	\N	\N	15000.00	available	f
349	35	Món 9	\N	\N	35000.00	available	f
350	35	Món 10	\N	\N	45000.00	available	f
351	36	Món 1	\N	\N	40000.00	available	f
352	36	Món 2	\N	\N	25000.00	available	f
353	36	Món 3	\N	\N	45000.00	available	f
354	36	Món 4	\N	\N	20000.00	available	f
355	36	Món 5	\N	\N	25000.00	available	f
356	36	Món 6	\N	\N	25000.00	available	f
357	36	Món 7	\N	\N	45000.00	available	f
358	36	Món 8	\N	\N	15000.00	available	f
359	36	Món 9	\N	\N	40000.00	available	f
360	36	Món 10	\N	\N	25000.00	available	f
361	37	Món 1	\N	\N	50000.00	available	f
362	37	Món 2	\N	\N	10000.00	available	f
363	37	Món 3	\N	\N	35000.00	available	f
364	37	Món 4	\N	\N	10000.00	available	f
365	37	Món 5	\N	\N	30000.00	available	f
366	37	Món 6	\N	\N	10000.00	available	f
367	37	Món 7	\N	\N	25000.00	available	f
368	37	Món 8	\N	\N	50000.00	available	f
369	37	Món 9	\N	\N	50000.00	available	f
370	37	Món 10	\N	\N	20000.00	available	f
371	38	Món 1	\N	\N	10000.00	available	f
372	38	Món 2	\N	\N	25000.00	available	f
373	38	Món 3	\N	\N	10000.00	available	f
374	38	Món 4	\N	\N	25000.00	available	f
375	38	Món 5	\N	\N	10000.00	available	f
376	38	Món 6	\N	\N	10000.00	available	f
377	38	Món 7	\N	\N	40000.00	available	f
378	38	Món 8	\N	\N	50000.00	available	f
379	38	Món 9	\N	\N	15000.00	available	f
380	38	Món 10	\N	\N	35000.00	available	f
381	39	Món 1	\N	\N	30000.00	available	f
382	39	Món 2	\N	\N	35000.00	available	f
383	39	Món 3	\N	\N	10000.00	available	f
384	39	Món 4	\N	\N	35000.00	available	f
385	39	Món 5	\N	\N	15000.00	available	f
386	39	Món 6	\N	\N	30000.00	available	f
387	39	Món 7	\N	\N	45000.00	available	f
388	39	Món 8	\N	\N	30000.00	available	f
389	39	Món 9	\N	\N	50000.00	available	f
390	39	Món 10	\N	\N	50000.00	available	f
391	40	Món 1	\N	\N	50000.00	available	f
392	40	Món 2	\N	\N	45000.00	available	f
393	40	Món 3	\N	\N	10000.00	available	f
394	40	Món 4	\N	\N	40000.00	available	f
395	40	Món 5	\N	\N	10000.00	available	f
396	40	Món 6	\N	\N	40000.00	available	f
397	40	Món 7	\N	\N	25000.00	available	f
398	40	Món 8	\N	\N	40000.00	available	f
399	40	Món 9	\N	\N	15000.00	available	f
400	40	Món 10	\N	\N	50000.00	available	f
401	41	Món 1	\N	\N	30000.00	available	f
402	41	Món 2	\N	\N	30000.00	available	f
403	41	Món 3	\N	\N	30000.00	available	f
404	41	Món 4	\N	\N	45000.00	available	f
405	41	Món 5	\N	\N	25000.00	available	f
406	41	Món 6	\N	\N	30000.00	available	f
407	41	Món 7	\N	\N	10000.00	available	f
408	41	Món 8	\N	\N	40000.00	available	f
409	41	Món 9	\N	\N	20000.00	available	f
410	41	Món 10	\N	\N	15000.00	available	f
411	42	Món 1	\N	\N	35000.00	available	f
412	42	Món 2	\N	\N	25000.00	available	f
413	42	Món 3	\N	\N	30000.00	available	f
414	42	Món 4	\N	\N	25000.00	available	f
415	42	Món 5	\N	\N	20000.00	available	f
416	42	Món 6	\N	\N	10000.00	available	f
417	42	Món 7	\N	\N	50000.00	available	f
418	42	Món 8	\N	\N	25000.00	available	f
419	42	Món 9	\N	\N	25000.00	available	f
420	42	Món 10	\N	\N	45000.00	available	f
421	43	Món 1	\N	\N	25000.00	available	f
422	43	Món 2	\N	\N	30000.00	available	f
423	43	Món 3	\N	\N	50000.00	available	f
424	43	Món 4	\N	\N	50000.00	available	f
425	43	Món 5	\N	\N	15000.00	available	f
426	43	Món 6	\N	\N	25000.00	available	f
427	43	Món 7	\N	\N	30000.00	available	f
428	43	Món 8	\N	\N	25000.00	available	f
429	43	Món 9	\N	\N	40000.00	available	f
430	43	Món 10	\N	\N	45000.00	available	f
431	44	Món 1	\N	\N	40000.00	available	f
432	44	Món 2	\N	\N	40000.00	available	f
433	44	Món 3	\N	\N	45000.00	available	f
434	44	Món 4	\N	\N	30000.00	available	f
435	44	Món 5	\N	\N	10000.00	available	f
436	44	Món 6	\N	\N	50000.00	available	f
437	44	Món 7	\N	\N	15000.00	available	f
438	44	Món 8	\N	\N	10000.00	available	f
439	44	Món 9	\N	\N	20000.00	available	f
440	44	Món 10	\N	\N	50000.00	available	f
441	45	Món 1	\N	\N	15000.00	available	f
442	45	Món 2	\N	\N	30000.00	available	f
443	45	Món 3	\N	\N	25000.00	available	f
444	45	Món 4	\N	\N	15000.00	available	f
445	45	Món 5	\N	\N	50000.00	available	f
446	45	Món 6	\N	\N	25000.00	available	f
447	45	Món 7	\N	\N	20000.00	available	f
448	45	Món 8	\N	\N	15000.00	available	f
449	45	Món 9	\N	\N	10000.00	available	f
450	45	Món 10	\N	\N	20000.00	available	f
451	46	Món 1	\N	\N	30000.00	available	f
452	46	Món 2	\N	\N	45000.00	available	f
453	46	Món 3	\N	\N	45000.00	available	f
454	46	Món 4	\N	\N	10000.00	available	f
455	46	Món 5	\N	\N	30000.00	available	f
456	46	Món 6	\N	\N	20000.00	available	f
457	46	Món 7	\N	\N	10000.00	available	f
458	46	Món 8	\N	\N	50000.00	available	f
459	46	Món 9	\N	\N	15000.00	available	f
460	46	Món 10	\N	\N	35000.00	available	f
461	47	Món 1	\N	\N	15000.00	available	f
462	47	Món 2	\N	\N	20000.00	available	f
463	47	Món 3	\N	\N	10000.00	available	f
464	47	Món 4	\N	\N	30000.00	available	f
465	47	Món 5	\N	\N	20000.00	available	f
466	47	Món 6	\N	\N	25000.00	available	f
467	47	Món 7	\N	\N	20000.00	available	f
468	47	Món 8	\N	\N	30000.00	available	f
469	47	Món 9	\N	\N	35000.00	available	f
470	47	Món 10	\N	\N	45000.00	available	f
471	48	Món 1	\N	\N	20000.00	available	f
472	48	Món 2	\N	\N	25000.00	available	f
473	48	Món 3	\N	\N	15000.00	available	f
474	48	Món 4	\N	\N	30000.00	available	f
475	48	Món 5	\N	\N	25000.00	available	f
476	48	Món 6	\N	\N	15000.00	available	f
477	48	Món 7	\N	\N	35000.00	available	f
478	48	Món 8	\N	\N	30000.00	available	f
479	48	Món 9	\N	\N	20000.00	available	f
480	48	Món 10	\N	\N	35000.00	available	f
481	49	Món 1	\N	\N	45000.00	available	f
482	49	Món 2	\N	\N	35000.00	available	f
483	49	Món 3	\N	\N	30000.00	available	f
484	49	Món 4	\N	\N	45000.00	available	f
485	49	Món 5	\N	\N	45000.00	available	f
486	49	Món 6	\N	\N	20000.00	available	f
487	49	Món 7	\N	\N	40000.00	available	f
488	49	Món 8	\N	\N	20000.00	available	f
489	49	Món 9	\N	\N	10000.00	available	f
490	49	Món 10	\N	\N	45000.00	available	f
491	50	Món 1	\N	\N	10000.00	available	f
492	50	Món 2	\N	\N	25000.00	available	f
493	50	Món 3	\N	\N	10000.00	available	f
494	50	Món 4	\N	\N	15000.00	available	f
495	50	Món 5	\N	\N	25000.00	available	f
496	50	Món 6	\N	\N	50000.00	available	f
497	50	Món 7	\N	\N	30000.00	available	f
498	50	Món 8	\N	\N	30000.00	available	f
499	50	Món 9	\N	\N	30000.00	available	f
500	50	Món 10	\N	\N	25000.00	available	f
501	51	Món 1	\N	\N	10000.00	available	f
502	51	Món 2	\N	\N	40000.00	available	f
503	51	Món 3	\N	\N	50000.00	available	f
504	51	Món 4	\N	\N	20000.00	available	f
505	51	Món 5	\N	\N	40000.00	available	f
506	51	Món 6	\N	\N	25000.00	available	f
507	51	Món 7	\N	\N	35000.00	available	f
508	51	Món 8	\N	\N	30000.00	available	f
509	51	Món 9	\N	\N	35000.00	available	f
510	51	Món 10	\N	\N	40000.00	available	f
511	52	Món 1	\N	\N	45000.00	available	f
512	52	Món 2	\N	\N	30000.00	available	f
513	52	Món 3	\N	\N	50000.00	available	f
514	52	Món 4	\N	\N	40000.00	available	f
515	52	Món 5	\N	\N	30000.00	available	f
516	52	Món 6	\N	\N	25000.00	available	f
517	52	Món 7	\N	\N	50000.00	available	f
518	52	Món 8	\N	\N	45000.00	available	f
519	52	Món 9	\N	\N	40000.00	available	f
520	52	Món 10	\N	\N	35000.00	available	f
521	53	Món 1	\N	\N	10000.00	available	f
522	53	Món 2	\N	\N	20000.00	available	f
523	53	Món 3	\N	\N	30000.00	available	f
524	53	Món 4	\N	\N	30000.00	available	f
525	53	Món 5	\N	\N	40000.00	available	f
526	53	Món 6	\N	\N	10000.00	available	f
527	53	Món 7	\N	\N	45000.00	available	f
528	53	Món 8	\N	\N	50000.00	available	f
529	53	Món 9	\N	\N	40000.00	available	f
530	53	Món 10	\N	\N	40000.00	available	f
531	54	Món 1	\N	\N	30000.00	available	f
532	54	Món 2	\N	\N	30000.00	available	f
533	54	Món 3	\N	\N	15000.00	available	f
534	54	Món 4	\N	\N	40000.00	available	f
535	54	Món 5	\N	\N	20000.00	available	f
536	54	Món 6	\N	\N	10000.00	available	f
537	54	Món 7	\N	\N	50000.00	available	f
538	54	Món 8	\N	\N	45000.00	available	f
539	54	Món 9	\N	\N	10000.00	available	f
540	54	Món 10	\N	\N	45000.00	available	f
541	55	Món 1	\N	\N	20000.00	available	f
542	55	Món 2	\N	\N	15000.00	available	f
543	55	Món 3	\N	\N	35000.00	available	f
544	55	Món 4	\N	\N	10000.00	available	f
545	55	Món 5	\N	\N	50000.00	available	f
546	55	Món 6	\N	\N	50000.00	available	f
547	55	Món 7	\N	\N	40000.00	available	f
548	55	Món 8	\N	\N	25000.00	available	f
549	55	Món 9	\N	\N	30000.00	available	f
550	55	Món 10	\N	\N	15000.00	available	f
551	56	Món 1	\N	\N	25000.00	available	f
552	56	Món 2	\N	\N	35000.00	available	f
553	56	Món 3	\N	\N	40000.00	available	f
554	56	Món 4	\N	\N	50000.00	available	f
555	56	Món 5	\N	\N	30000.00	available	f
556	56	Món 6	\N	\N	20000.00	available	f
557	56	Món 7	\N	\N	35000.00	available	f
558	56	Món 8	\N	\N	35000.00	available	f
559	56	Món 9	\N	\N	30000.00	available	f
560	56	Món 10	\N	\N	45000.00	available	f
561	57	Món 1	\N	\N	20000.00	available	f
562	57	Món 2	\N	\N	30000.00	available	f
563	57	Món 3	\N	\N	45000.00	available	f
564	57	Món 4	\N	\N	10000.00	available	f
565	57	Món 5	\N	\N	50000.00	available	f
566	57	Món 6	\N	\N	35000.00	available	f
567	57	Món 7	\N	\N	25000.00	available	f
568	57	Món 8	\N	\N	50000.00	available	f
569	57	Món 9	\N	\N	10000.00	available	f
570	57	Món 10	\N	\N	20000.00	available	f
571	58	Món 1	\N	\N	30000.00	available	f
572	58	Món 2	\N	\N	10000.00	available	f
573	58	Món 3	\N	\N	30000.00	available	f
574	58	Món 4	\N	\N	25000.00	available	f
575	58	Món 5	\N	\N	35000.00	available	f
576	58	Món 6	\N	\N	50000.00	available	f
577	58	Món 7	\N	\N	45000.00	available	f
578	58	Món 8	\N	\N	20000.00	available	f
579	58	Món 9	\N	\N	45000.00	available	f
580	58	Món 10	\N	\N	30000.00	available	f
581	59	Món 1	\N	\N	30000.00	available	f
582	59	Món 2	\N	\N	30000.00	available	f
583	59	Món 3	\N	\N	30000.00	available	f
584	59	Món 4	\N	\N	30000.00	available	f
585	59	Món 5	\N	\N	10000.00	available	f
586	59	Món 6	\N	\N	45000.00	available	f
587	59	Món 7	\N	\N	20000.00	available	f
588	59	Món 8	\N	\N	40000.00	available	f
589	59	Món 9	\N	\N	50000.00	available	f
590	59	Món 10	\N	\N	30000.00	available	f
591	60	Món 1	\N	\N	40000.00	available	f
592	60	Món 2	\N	\N	50000.00	available	f
593	60	Món 3	\N	\N	50000.00	available	f
594	60	Món 4	\N	\N	25000.00	available	f
595	60	Món 5	\N	\N	40000.00	available	f
596	60	Món 6	\N	\N	50000.00	available	f
597	60	Món 7	\N	\N	50000.00	available	f
598	60	Món 8	\N	\N	30000.00	available	f
599	60	Món 9	\N	\N	15000.00	available	f
600	60	Món 10	\N	\N	30000.00	available	f
601	61	Món 1	\N	\N	50000.00	available	f
602	61	Món 2	\N	\N	25000.00	available	f
603	61	Món 3	\N	\N	20000.00	available	f
604	61	Món 4	\N	\N	35000.00	available	f
605	61	Món 5	\N	\N	35000.00	available	f
606	61	Món 6	\N	\N	10000.00	available	f
607	61	Món 7	\N	\N	45000.00	available	f
608	61	Món 8	\N	\N	35000.00	available	f
609	61	Món 9	\N	\N	20000.00	available	f
610	61	Món 10	\N	\N	40000.00	available	f
611	62	Món 1	\N	\N	35000.00	available	f
612	62	Món 2	\N	\N	15000.00	available	f
613	62	Món 3	\N	\N	20000.00	available	f
614	62	Món 4	\N	\N	30000.00	available	f
615	62	Món 5	\N	\N	35000.00	available	f
616	62	Món 6	\N	\N	50000.00	available	f
617	62	Món 7	\N	\N	10000.00	available	f
618	62	Món 8	\N	\N	15000.00	available	f
619	62	Món 9	\N	\N	10000.00	available	f
620	62	Món 10	\N	\N	35000.00	available	f
621	63	Món 1	\N	\N	40000.00	available	f
622	63	Món 2	\N	\N	50000.00	available	f
623	63	Món 3	\N	\N	35000.00	available	f
624	63	Món 4	\N	\N	45000.00	available	f
625	63	Món 5	\N	\N	15000.00	available	f
626	63	Món 6	\N	\N	40000.00	available	f
627	63	Món 7	\N	\N	20000.00	available	f
628	63	Món 8	\N	\N	45000.00	available	f
629	63	Món 9	\N	\N	10000.00	available	f
630	63	Món 10	\N	\N	20000.00	available	f
631	64	Món 1	\N	\N	15000.00	available	f
632	64	Món 2	\N	\N	40000.00	available	f
633	64	Món 3	\N	\N	25000.00	available	f
634	64	Món 4	\N	\N	30000.00	available	f
635	64	Món 5	\N	\N	35000.00	available	f
636	64	Món 6	\N	\N	40000.00	available	f
637	64	Món 7	\N	\N	50000.00	available	f
638	64	Món 8	\N	\N	30000.00	available	f
639	64	Món 9	\N	\N	30000.00	available	f
640	64	Món 10	\N	\N	35000.00	available	f
641	65	Món 1	\N	\N	50000.00	available	f
642	65	Món 2	\N	\N	45000.00	available	f
643	65	Món 3	\N	\N	10000.00	available	f
644	65	Món 4	\N	\N	40000.00	available	f
645	65	Món 5	\N	\N	20000.00	available	f
646	65	Món 6	\N	\N	45000.00	available	f
647	65	Món 7	\N	\N	45000.00	available	f
648	65	Món 8	\N	\N	30000.00	available	f
649	65	Món 9	\N	\N	10000.00	available	f
650	65	Món 10	\N	\N	45000.00	available	f
651	66	Món 1	\N	\N	45000.00	available	f
652	66	Món 2	\N	\N	20000.00	available	f
653	66	Món 3	\N	\N	35000.00	available	f
654	66	Món 4	\N	\N	50000.00	available	f
655	66	Món 5	\N	\N	50000.00	available	f
656	66	Món 6	\N	\N	10000.00	available	f
657	66	Món 7	\N	\N	15000.00	available	f
658	66	Món 8	\N	\N	20000.00	available	f
659	66	Món 9	\N	\N	35000.00	available	f
660	66	Món 10	\N	\N	40000.00	available	f
661	67	Món 1	\N	\N	50000.00	available	f
662	67	Món 2	\N	\N	30000.00	available	f
663	67	Món 3	\N	\N	25000.00	available	f
664	67	Món 4	\N	\N	20000.00	available	f
665	67	Món 5	\N	\N	50000.00	available	f
666	67	Món 6	\N	\N	30000.00	available	f
667	67	Món 7	\N	\N	25000.00	available	f
668	67	Món 8	\N	\N	10000.00	available	f
669	67	Món 9	\N	\N	20000.00	available	f
670	67	Món 10	\N	\N	15000.00	available	f
671	68	Món 1	\N	\N	35000.00	available	f
672	68	Món 2	\N	\N	15000.00	available	f
673	68	Món 3	\N	\N	45000.00	available	f
674	68	Món 4	\N	\N	40000.00	available	f
675	68	Món 5	\N	\N	10000.00	available	f
676	68	Món 6	\N	\N	25000.00	available	f
677	68	Món 7	\N	\N	15000.00	available	f
678	68	Món 8	\N	\N	30000.00	available	f
679	68	Món 9	\N	\N	15000.00	available	f
680	68	Món 10	\N	\N	25000.00	available	f
681	69	Món 1	\N	\N	15000.00	available	f
682	69	Món 2	\N	\N	40000.00	available	f
683	69	Món 3	\N	\N	15000.00	available	f
684	69	Món 4	\N	\N	15000.00	available	f
685	69	Món 5	\N	\N	40000.00	available	f
686	69	Món 6	\N	\N	20000.00	available	f
687	69	Món 7	\N	\N	35000.00	available	f
688	69	Món 8	\N	\N	50000.00	available	f
689	69	Món 9	\N	\N	10000.00	available	f
690	69	Món 10	\N	\N	35000.00	available	f
691	70	Món 1	\N	\N	45000.00	available	f
692	70	Món 2	\N	\N	30000.00	available	f
693	70	Món 3	\N	\N	20000.00	available	f
694	70	Món 4	\N	\N	35000.00	available	f
695	70	Món 5	\N	\N	40000.00	available	f
696	70	Món 6	\N	\N	15000.00	available	f
697	70	Món 7	\N	\N	30000.00	available	f
698	70	Món 8	\N	\N	10000.00	available	f
699	70	Món 9	\N	\N	25000.00	available	f
700	70	Món 10	\N	\N	20000.00	available	f
701	71	Món 1	\N	\N	15000.00	available	f
702	71	Món 2	\N	\N	25000.00	available	f
703	71	Món 3	\N	\N	25000.00	available	f
704	71	Món 4	\N	\N	45000.00	available	f
705	71	Món 5	\N	\N	35000.00	available	f
706	71	Món 6	\N	\N	15000.00	available	f
707	71	Món 7	\N	\N	20000.00	available	f
708	71	Món 8	\N	\N	15000.00	available	f
709	71	Món 9	\N	\N	45000.00	available	f
710	71	Món 10	\N	\N	35000.00	available	f
711	72	Món 1	\N	\N	50000.00	available	f
712	72	Món 2	\N	\N	15000.00	available	f
713	72	Món 3	\N	\N	30000.00	available	f
714	72	Món 4	\N	\N	20000.00	available	f
715	72	Món 5	\N	\N	25000.00	available	f
716	72	Món 6	\N	\N	20000.00	available	f
717	72	Món 7	\N	\N	35000.00	available	f
718	72	Món 8	\N	\N	45000.00	available	f
719	72	Món 9	\N	\N	25000.00	available	f
720	72	Món 10	\N	\N	10000.00	available	f
721	73	Món 1	\N	\N	40000.00	available	f
722	73	Món 2	\N	\N	45000.00	available	f
723	73	Món 3	\N	\N	50000.00	available	f
724	73	Món 4	\N	\N	45000.00	available	f
725	73	Món 5	\N	\N	30000.00	available	f
726	73	Món 6	\N	\N	25000.00	available	f
727	73	Món 7	\N	\N	10000.00	available	f
728	73	Món 8	\N	\N	20000.00	available	f
729	73	Món 9	\N	\N	35000.00	available	f
730	73	Món 10	\N	\N	25000.00	available	f
731	74	Món 1	\N	\N	50000.00	available	f
732	74	Món 2	\N	\N	35000.00	available	f
733	74	Món 3	\N	\N	15000.00	available	f
734	74	Món 4	\N	\N	40000.00	available	f
735	74	Món 5	\N	\N	25000.00	available	f
736	74	Món 6	\N	\N	40000.00	available	f
737	74	Món 7	\N	\N	30000.00	available	f
738	74	Món 8	\N	\N	30000.00	available	f
739	74	Món 9	\N	\N	10000.00	available	f
740	74	Món 10	\N	\N	25000.00	available	f
741	75	Món 1	\N	\N	15000.00	available	f
742	75	Món 2	\N	\N	30000.00	available	f
743	75	Món 3	\N	\N	25000.00	available	f
744	75	Món 4	\N	\N	50000.00	available	f
745	75	Món 5	\N	\N	35000.00	available	f
746	75	Món 6	\N	\N	25000.00	available	f
747	75	Món 7	\N	\N	25000.00	available	f
748	75	Món 8	\N	\N	50000.00	available	f
749	75	Món 9	\N	\N	15000.00	available	f
750	75	Món 10	\N	\N	30000.00	available	f
751	76	Món 1	\N	\N	20000.00	available	f
752	76	Món 2	\N	\N	25000.00	available	f
753	76	Món 3	\N	\N	25000.00	available	f
754	76	Món 4	\N	\N	15000.00	available	f
755	76	Món 5	\N	\N	40000.00	available	f
756	76	Món 6	\N	\N	20000.00	available	f
757	76	Món 7	\N	\N	35000.00	available	f
758	76	Món 8	\N	\N	15000.00	available	f
759	76	Món 9	\N	\N	35000.00	available	f
760	76	Món 10	\N	\N	25000.00	available	f
761	77	Món 1	\N	\N	35000.00	available	f
762	77	Món 2	\N	\N	10000.00	available	f
763	77	Món 3	\N	\N	50000.00	available	f
764	77	Món 4	\N	\N	30000.00	available	f
765	77	Món 5	\N	\N	20000.00	available	f
766	77	Món 6	\N	\N	45000.00	available	f
767	77	Món 7	\N	\N	35000.00	available	f
768	77	Món 8	\N	\N	50000.00	available	f
769	77	Món 9	\N	\N	10000.00	available	f
770	77	Món 10	\N	\N	10000.00	available	f
771	78	Món 1	\N	\N	25000.00	available	f
772	78	Món 2	\N	\N	50000.00	available	f
773	78	Món 3	\N	\N	45000.00	available	f
774	78	Món 4	\N	\N	50000.00	available	f
775	78	Món 5	\N	\N	35000.00	available	f
776	78	Món 6	\N	\N	35000.00	available	f
777	78	Món 7	\N	\N	15000.00	available	f
778	78	Món 8	\N	\N	45000.00	available	f
779	78	Món 9	\N	\N	35000.00	available	f
780	78	Món 10	\N	\N	20000.00	available	f
781	79	Món 1	\N	\N	20000.00	available	f
782	79	Món 2	\N	\N	15000.00	available	f
783	79	Món 3	\N	\N	25000.00	available	f
784	79	Món 4	\N	\N	20000.00	available	f
785	79	Món 5	\N	\N	20000.00	available	f
786	79	Món 6	\N	\N	50000.00	available	f
787	79	Món 7	\N	\N	10000.00	available	f
788	79	Món 8	\N	\N	40000.00	available	f
789	79	Món 9	\N	\N	40000.00	available	f
790	79	Món 10	\N	\N	15000.00	available	f
791	80	Món 1	\N	\N	15000.00	available	f
792	80	Món 2	\N	\N	15000.00	available	f
793	80	Món 3	\N	\N	10000.00	available	f
794	80	Món 4	\N	\N	35000.00	available	f
795	80	Món 5	\N	\N	20000.00	available	f
796	80	Món 6	\N	\N	35000.00	available	f
797	80	Món 7	\N	\N	25000.00	available	f
798	80	Món 8	\N	\N	50000.00	available	f
799	80	Món 9	\N	\N	45000.00	available	f
800	80	Món 10	\N	\N	50000.00	available	f
801	81	Món 1	\N	\N	45000.00	available	f
802	81	Món 2	\N	\N	15000.00	available	f
803	81	Món 3	\N	\N	25000.00	available	f
804	81	Món 4	\N	\N	15000.00	available	f
805	81	Món 5	\N	\N	10000.00	available	f
806	81	Món 6	\N	\N	35000.00	available	f
807	81	Món 7	\N	\N	25000.00	available	f
808	81	Món 8	\N	\N	25000.00	available	f
809	81	Món 9	\N	\N	15000.00	available	f
810	81	Món 10	\N	\N	25000.00	available	f
811	82	Món 1	\N	\N	50000.00	available	f
812	82	Món 2	\N	\N	50000.00	available	f
813	82	Món 3	\N	\N	50000.00	available	f
814	82	Món 4	\N	\N	35000.00	available	f
815	82	Món 5	\N	\N	30000.00	available	f
816	82	Món 6	\N	\N	40000.00	available	f
817	82	Món 7	\N	\N	35000.00	available	f
818	82	Món 8	\N	\N	45000.00	available	f
819	82	Món 9	\N	\N	30000.00	available	f
820	82	Món 10	\N	\N	35000.00	available	f
821	83	Món 1	\N	\N	45000.00	available	f
822	83	Món 2	\N	\N	35000.00	available	f
823	83	Món 3	\N	\N	20000.00	available	f
824	83	Món 4	\N	\N	30000.00	available	f
825	83	Món 5	\N	\N	30000.00	available	f
826	83	Món 6	\N	\N	40000.00	available	f
827	83	Món 7	\N	\N	25000.00	available	f
828	83	Món 8	\N	\N	15000.00	available	f
829	83	Món 9	\N	\N	10000.00	available	f
830	83	Món 10	\N	\N	45000.00	available	f
831	84	Món 1	\N	\N	20000.00	available	f
832	84	Món 2	\N	\N	35000.00	available	f
833	84	Món 3	\N	\N	10000.00	available	f
834	84	Món 4	\N	\N	40000.00	available	f
835	84	Món 5	\N	\N	40000.00	available	f
836	84	Món 6	\N	\N	15000.00	available	f
837	84	Món 7	\N	\N	30000.00	available	f
838	84	Món 8	\N	\N	35000.00	available	f
839	84	Món 9	\N	\N	40000.00	available	f
840	84	Món 10	\N	\N	10000.00	available	f
841	85	Món 1	\N	\N	25000.00	available	f
842	85	Món 2	\N	\N	15000.00	available	f
843	85	Món 3	\N	\N	30000.00	available	f
844	85	Món 4	\N	\N	50000.00	available	f
845	85	Món 5	\N	\N	15000.00	available	f
846	85	Món 6	\N	\N	15000.00	available	f
847	85	Món 7	\N	\N	50000.00	available	f
848	85	Món 8	\N	\N	50000.00	available	f
849	85	Món 9	\N	\N	50000.00	available	f
850	85	Món 10	\N	\N	40000.00	available	f
851	86	Món 1	\N	\N	45000.00	available	f
852	86	Món 2	\N	\N	25000.00	available	f
853	86	Món 3	\N	\N	40000.00	available	f
854	86	Món 4	\N	\N	40000.00	available	f
855	86	Món 5	\N	\N	50000.00	available	f
856	86	Món 6	\N	\N	45000.00	available	f
857	86	Món 7	\N	\N	50000.00	available	f
858	86	Món 8	\N	\N	50000.00	available	f
859	86	Món 9	\N	\N	50000.00	available	f
860	86	Món 10	\N	\N	40000.00	available	f
861	87	Món 1	\N	\N	45000.00	available	f
862	87	Món 2	\N	\N	35000.00	available	f
863	87	Món 3	\N	\N	50000.00	available	f
864	87	Món 4	\N	\N	15000.00	available	f
865	87	Món 5	\N	\N	40000.00	available	f
866	87	Món 6	\N	\N	20000.00	available	f
867	87	Món 7	\N	\N	45000.00	available	f
868	87	Món 8	\N	\N	30000.00	available	f
869	87	Món 9	\N	\N	35000.00	available	f
870	87	Món 10	\N	\N	50000.00	available	f
871	88	Món 1	\N	\N	20000.00	available	f
872	88	Món 2	\N	\N	50000.00	available	f
873	88	Món 3	\N	\N	50000.00	available	f
874	88	Món 4	\N	\N	50000.00	available	f
875	88	Món 5	\N	\N	25000.00	available	f
876	88	Món 6	\N	\N	35000.00	available	f
877	88	Món 7	\N	\N	40000.00	available	f
878	88	Món 8	\N	\N	20000.00	available	f
879	88	Món 9	\N	\N	50000.00	available	f
880	88	Món 10	\N	\N	50000.00	available	f
881	89	Món 1	\N	\N	35000.00	available	f
882	89	Món 2	\N	\N	10000.00	available	f
883	89	Món 3	\N	\N	45000.00	available	f
884	89	Món 4	\N	\N	30000.00	available	f
885	89	Món 5	\N	\N	35000.00	available	f
886	89	Món 6	\N	\N	40000.00	available	f
887	89	Món 7	\N	\N	20000.00	available	f
888	89	Món 8	\N	\N	10000.00	available	f
889	89	Món 9	\N	\N	45000.00	available	f
890	89	Món 10	\N	\N	10000.00	available	f
891	90	Món 1	\N	\N	25000.00	available	f
892	90	Món 2	\N	\N	20000.00	available	f
893	90	Món 3	\N	\N	15000.00	available	f
894	90	Món 4	\N	\N	20000.00	available	f
895	90	Món 5	\N	\N	10000.00	available	f
896	90	Món 6	\N	\N	30000.00	available	f
897	90	Món 7	\N	\N	25000.00	available	f
898	90	Món 8	\N	\N	10000.00	available	f
899	90	Món 9	\N	\N	40000.00	available	f
900	90	Món 10	\N	\N	10000.00	available	f
901	91	Món 1	\N	\N	25000.00	available	f
902	91	Món 2	\N	\N	25000.00	available	f
903	91	Món 3	\N	\N	30000.00	available	f
904	91	Món 4	\N	\N	50000.00	available	f
905	91	Món 5	\N	\N	15000.00	available	f
906	91	Món 6	\N	\N	40000.00	available	f
907	91	Món 7	\N	\N	20000.00	available	f
908	91	Món 8	\N	\N	40000.00	available	f
909	91	Món 9	\N	\N	25000.00	available	f
910	91	Món 10	\N	\N	10000.00	available	f
911	92	Món 1	\N	\N	40000.00	available	f
912	92	Món 2	\N	\N	25000.00	available	f
913	92	Món 3	\N	\N	30000.00	available	f
914	92	Món 4	\N	\N	40000.00	available	f
915	92	Món 5	\N	\N	10000.00	available	f
916	92	Món 6	\N	\N	20000.00	available	f
917	92	Món 7	\N	\N	20000.00	available	f
918	92	Món 8	\N	\N	35000.00	available	f
919	92	Món 9	\N	\N	25000.00	available	f
920	92	Món 10	\N	\N	30000.00	available	f
921	93	Món 1	\N	\N	20000.00	available	f
922	93	Món 2	\N	\N	30000.00	available	f
923	93	Món 3	\N	\N	10000.00	available	f
924	93	Món 4	\N	\N	50000.00	available	f
925	93	Món 5	\N	\N	20000.00	available	f
926	93	Món 6	\N	\N	45000.00	available	f
927	93	Món 7	\N	\N	20000.00	available	f
928	93	Món 8	\N	\N	25000.00	available	f
929	93	Món 9	\N	\N	30000.00	available	f
930	93	Món 10	\N	\N	20000.00	available	f
931	94	Món 1	\N	\N	50000.00	available	f
932	94	Món 2	\N	\N	40000.00	available	f
933	94	Món 3	\N	\N	25000.00	available	f
934	94	Món 4	\N	\N	20000.00	available	f
935	94	Món 5	\N	\N	35000.00	available	f
936	94	Món 6	\N	\N	30000.00	available	f
937	94	Món 7	\N	\N	10000.00	available	f
938	94	Món 8	\N	\N	20000.00	available	f
939	94	Món 9	\N	\N	10000.00	available	f
940	94	Món 10	\N	\N	50000.00	available	f
941	95	Món 1	\N	\N	20000.00	available	f
942	95	Món 2	\N	\N	15000.00	available	f
943	95	Món 3	\N	\N	35000.00	available	f
944	95	Món 4	\N	\N	25000.00	available	f
945	95	Món 5	\N	\N	15000.00	available	f
946	95	Món 6	\N	\N	45000.00	available	f
947	95	Món 7	\N	\N	30000.00	available	f
948	95	Món 8	\N	\N	20000.00	available	f
949	95	Món 9	\N	\N	20000.00	available	f
950	95	Món 10	\N	\N	20000.00	available	f
951	96	Món 1	\N	\N	35000.00	available	f
952	96	Món 2	\N	\N	40000.00	available	f
953	96	Món 3	\N	\N	45000.00	available	f
954	96	Món 4	\N	\N	50000.00	available	f
955	96	Món 5	\N	\N	40000.00	available	f
956	96	Món 6	\N	\N	15000.00	available	f
957	96	Món 7	\N	\N	25000.00	available	f
958	96	Món 8	\N	\N	25000.00	available	f
959	96	Món 9	\N	\N	50000.00	available	f
960	96	Món 10	\N	\N	35000.00	available	f
961	97	Món 1	\N	\N	35000.00	available	f
962	97	Món 2	\N	\N	50000.00	available	f
963	97	Món 3	\N	\N	10000.00	available	f
964	97	Món 4	\N	\N	35000.00	available	f
965	97	Món 5	\N	\N	45000.00	available	f
966	97	Món 6	\N	\N	25000.00	available	f
967	97	Món 7	\N	\N	10000.00	available	f
968	97	Món 8	\N	\N	25000.00	available	f
969	97	Món 9	\N	\N	30000.00	available	f
970	97	Món 10	\N	\N	15000.00	available	f
971	98	Món 1	\N	\N	35000.00	available	f
972	98	Món 2	\N	\N	35000.00	available	f
973	98	Món 3	\N	\N	40000.00	available	f
974	98	Món 4	\N	\N	45000.00	available	f
975	98	Món 5	\N	\N	50000.00	available	f
976	98	Món 6	\N	\N	20000.00	available	f
977	98	Món 7	\N	\N	20000.00	available	f
978	98	Món 8	\N	\N	25000.00	available	f
979	98	Món 9	\N	\N	10000.00	available	f
980	98	Món 10	\N	\N	25000.00	available	f
981	99	Món 1	\N	\N	20000.00	available	f
982	99	Món 2	\N	\N	30000.00	available	f
983	99	Món 3	\N	\N	50000.00	available	f
984	99	Món 4	\N	\N	50000.00	available	f
985	99	Món 5	\N	\N	25000.00	available	f
986	99	Món 6	\N	\N	10000.00	available	f
987	99	Món 7	\N	\N	50000.00	available	f
988	99	Món 8	\N	\N	40000.00	available	f
989	99	Món 9	\N	\N	15000.00	available	f
990	99	Món 10	\N	\N	20000.00	available	f
991	100	Món 1	\N	\N	35000.00	available	f
992	100	Món 2	\N	\N	25000.00	available	f
993	100	Món 3	\N	\N	50000.00	available	f
994	100	Món 4	\N	\N	25000.00	available	f
995	100	Món 5	\N	\N	30000.00	available	f
996	100	Món 6	\N	\N	40000.00	available	f
997	100	Món 7	\N	\N	30000.00	available	f
998	100	Món 8	\N	\N	35000.00	available	f
999	100	Món 9	\N	\N	10000.00	available	f
1000	100	Món 10	\N	\N	40000.00	available	f
1001	101	Món 1	\N	\N	25000.00	available	f
1002	101	Món 2	\N	\N	50000.00	available	f
1003	101	Món 3	\N	\N	20000.00	available	f
1004	101	Món 4	\N	\N	50000.00	available	f
1005	101	Món 5	\N	\N	50000.00	available	f
1006	101	Món 6	\N	\N	35000.00	available	f
1007	101	Món 7	\N	\N	40000.00	available	f
1008	101	Món 8	\N	\N	30000.00	available	f
1009	101	Món 9	\N	\N	30000.00	available	f
1010	101	Món 10	\N	\N	25000.00	available	f
1011	102	Món 1	\N	\N	50000.00	available	f
1012	102	Món 2	\N	\N	50000.00	available	f
1013	102	Món 3	\N	\N	45000.00	available	f
1014	102	Món 4	\N	\N	45000.00	available	f
1015	102	Món 5	\N	\N	20000.00	available	f
1016	102	Món 6	\N	\N	10000.00	available	f
1017	102	Món 7	\N	\N	20000.00	available	f
1018	102	Món 8	\N	\N	15000.00	available	f
1019	102	Món 9	\N	\N	45000.00	available	f
1020	102	Món 10	\N	\N	10000.00	available	f
1021	103	Món 1	\N	\N	50000.00	available	f
1022	103	Món 2	\N	\N	30000.00	available	f
1023	103	Món 3	\N	\N	40000.00	available	f
1024	103	Món 4	\N	\N	50000.00	available	f
1025	103	Món 5	\N	\N	35000.00	available	f
1026	103	Món 6	\N	\N	35000.00	available	f
1027	103	Món 7	\N	\N	40000.00	available	f
1028	103	Món 8	\N	\N	20000.00	available	f
1029	103	Món 9	\N	\N	30000.00	available	f
1030	103	Món 10	\N	\N	40000.00	available	f
1031	104	Món 1	\N	\N	25000.00	available	f
1032	104	Món 2	\N	\N	40000.00	available	f
1033	104	Món 3	\N	\N	15000.00	available	f
1034	104	Món 4	\N	\N	30000.00	available	f
1035	104	Món 5	\N	\N	45000.00	available	f
1036	104	Món 6	\N	\N	50000.00	available	f
1037	104	Món 7	\N	\N	35000.00	available	f
1038	104	Món 8	\N	\N	40000.00	available	f
1039	104	Món 9	\N	\N	30000.00	available	f
1040	104	Món 10	\N	\N	35000.00	available	f
1041	105	Món 1	\N	\N	30000.00	available	f
1042	105	Món 2	\N	\N	40000.00	available	f
1043	105	Món 3	\N	\N	30000.00	available	f
1044	105	Món 4	\N	\N	40000.00	available	f
1045	105	Món 5	\N	\N	50000.00	available	f
1046	105	Món 6	\N	\N	20000.00	available	f
1047	105	Món 7	\N	\N	30000.00	available	f
1048	105	Món 8	\N	\N	45000.00	available	f
1049	105	Món 9	\N	\N	20000.00	available	f
1050	105	Món 10	\N	\N	50000.00	available	f
1051	106	Món 1	\N	\N	25000.00	available	f
1052	106	Món 2	\N	\N	50000.00	available	f
1053	106	Món 3	\N	\N	45000.00	available	f
1054	106	Món 4	\N	\N	25000.00	available	f
1055	106	Món 5	\N	\N	35000.00	available	f
1056	106	Món 6	\N	\N	35000.00	available	f
1057	106	Món 7	\N	\N	15000.00	available	f
1058	106	Món 8	\N	\N	20000.00	available	f
1059	106	Món 9	\N	\N	25000.00	available	f
1060	106	Món 10	\N	\N	15000.00	available	f
1061	107	Món 1	\N	\N	25000.00	available	f
1062	107	Món 2	\N	\N	15000.00	available	f
1063	107	Món 3	\N	\N	25000.00	available	f
1064	107	Món 4	\N	\N	45000.00	available	f
1065	107	Món 5	\N	\N	35000.00	available	f
1066	107	Món 6	\N	\N	15000.00	available	f
1067	107	Món 7	\N	\N	45000.00	available	f
1068	107	Món 8	\N	\N	10000.00	available	f
1069	107	Món 9	\N	\N	35000.00	available	f
1070	107	Món 10	\N	\N	10000.00	available	f
1071	108	Món 1	\N	\N	15000.00	available	f
1072	108	Món 2	\N	\N	20000.00	available	f
1073	108	Món 3	\N	\N	15000.00	available	f
1074	108	Món 4	\N	\N	10000.00	available	f
1075	108	Món 5	\N	\N	30000.00	available	f
1076	108	Món 6	\N	\N	50000.00	available	f
1077	108	Món 7	\N	\N	50000.00	available	f
1078	108	Món 8	\N	\N	35000.00	available	f
1079	108	Món 9	\N	\N	45000.00	available	f
1080	108	Món 10	\N	\N	50000.00	available	f
1081	109	Món 1	\N	\N	30000.00	available	f
1082	109	Món 2	\N	\N	30000.00	available	f
1083	109	Món 3	\N	\N	15000.00	available	f
1084	109	Món 4	\N	\N	45000.00	available	f
1085	109	Món 5	\N	\N	45000.00	available	f
1086	109	Món 6	\N	\N	45000.00	available	f
1087	109	Món 7	\N	\N	15000.00	available	f
1088	109	Món 8	\N	\N	25000.00	available	f
1089	109	Món 9	\N	\N	45000.00	available	f
1090	109	Món 10	\N	\N	20000.00	available	f
1091	110	Món 1	\N	\N	10000.00	available	f
1092	110	Món 2	\N	\N	30000.00	available	f
1093	110	Món 3	\N	\N	45000.00	available	f
1094	110	Món 4	\N	\N	45000.00	available	f
1095	110	Món 5	\N	\N	15000.00	available	f
1096	110	Món 6	\N	\N	25000.00	available	f
1097	110	Món 7	\N	\N	40000.00	available	f
1098	110	Món 8	\N	\N	30000.00	available	f
1099	110	Món 9	\N	\N	30000.00	available	f
1100	110	Món 10	\N	\N	45000.00	available	f
1101	111	Món 1	\N	\N	35000.00	available	f
1102	111	Món 2	\N	\N	40000.00	available	f
1103	111	Món 3	\N	\N	10000.00	available	f
1104	111	Món 4	\N	\N	10000.00	available	f
1105	111	Món 5	\N	\N	10000.00	available	f
1106	111	Món 6	\N	\N	45000.00	available	f
1107	111	Món 7	\N	\N	30000.00	available	f
1108	111	Món 8	\N	\N	45000.00	available	f
1109	111	Món 9	\N	\N	20000.00	available	f
1110	111	Món 10	\N	\N	35000.00	available	f
1111	112	Món 1	\N	\N	45000.00	available	f
1112	112	Món 2	\N	\N	15000.00	available	f
1113	112	Món 3	\N	\N	35000.00	available	f
1114	112	Món 4	\N	\N	10000.00	available	f
1115	112	Món 5	\N	\N	25000.00	available	f
1116	112	Món 6	\N	\N	20000.00	available	f
1117	112	Món 7	\N	\N	10000.00	available	f
1118	112	Món 8	\N	\N	30000.00	available	f
1119	112	Món 9	\N	\N	15000.00	available	f
1120	112	Món 10	\N	\N	35000.00	available	f
1121	113	Món 1	\N	\N	15000.00	available	f
1122	113	Món 2	\N	\N	25000.00	available	f
1123	113	Món 3	\N	\N	15000.00	available	f
1124	113	Món 4	\N	\N	40000.00	available	f
1125	113	Món 5	\N	\N	50000.00	available	f
1126	113	Món 6	\N	\N	35000.00	available	f
1127	113	Món 7	\N	\N	45000.00	available	f
1128	113	Món 8	\N	\N	15000.00	available	f
1129	113	Món 9	\N	\N	50000.00	available	f
1130	113	Món 10	\N	\N	45000.00	available	f
1131	114	Món 1	\N	\N	15000.00	available	f
1132	114	Món 2	\N	\N	40000.00	available	f
1133	114	Món 3	\N	\N	40000.00	available	f
1134	114	Món 4	\N	\N	25000.00	available	f
1135	114	Món 5	\N	\N	30000.00	available	f
1136	114	Món 6	\N	\N	15000.00	available	f
1137	114	Món 7	\N	\N	15000.00	available	f
1138	114	Món 8	\N	\N	20000.00	available	f
1139	114	Món 9	\N	\N	45000.00	available	f
1140	114	Món 10	\N	\N	40000.00	available	f
1141	115	Món 1	\N	\N	40000.00	available	f
1142	115	Món 2	\N	\N	35000.00	available	f
1143	115	Món 3	\N	\N	10000.00	available	f
1144	115	Món 4	\N	\N	50000.00	available	f
1145	115	Món 5	\N	\N	25000.00	available	f
1146	115	Món 6	\N	\N	50000.00	available	f
1147	115	Món 7	\N	\N	10000.00	available	f
1148	115	Món 8	\N	\N	35000.00	available	f
1149	115	Món 9	\N	\N	10000.00	available	f
1150	115	Món 10	\N	\N	25000.00	available	f
1151	116	Món 1	\N	\N	45000.00	available	f
1152	116	Món 2	\N	\N	25000.00	available	f
1153	116	Món 3	\N	\N	15000.00	available	f
1154	116	Món 4	\N	\N	20000.00	available	f
1155	116	Món 5	\N	\N	35000.00	available	f
1156	116	Món 6	\N	\N	25000.00	available	f
1157	116	Món 7	\N	\N	25000.00	available	f
1158	116	Món 8	\N	\N	35000.00	available	f
1159	116	Món 9	\N	\N	45000.00	available	f
1160	116	Món 10	\N	\N	35000.00	available	f
1161	117	Món 1	\N	\N	20000.00	available	f
1162	117	Món 2	\N	\N	15000.00	available	f
1163	117	Món 3	\N	\N	25000.00	available	f
1164	117	Món 4	\N	\N	50000.00	available	f
1165	117	Món 5	\N	\N	10000.00	available	f
1166	117	Món 6	\N	\N	20000.00	available	f
1167	117	Món 7	\N	\N	35000.00	available	f
1168	117	Món 8	\N	\N	25000.00	available	f
1169	117	Món 9	\N	\N	25000.00	available	f
1170	117	Món 10	\N	\N	40000.00	available	f
1171	118	Món 1	\N	\N	25000.00	available	f
1172	118	Món 2	\N	\N	35000.00	available	f
1173	118	Món 3	\N	\N	45000.00	available	f
1174	118	Món 4	\N	\N	40000.00	available	f
1175	118	Món 5	\N	\N	25000.00	available	f
1176	118	Món 6	\N	\N	15000.00	available	f
1177	118	Món 7	\N	\N	40000.00	available	f
1178	118	Món 8	\N	\N	25000.00	available	f
1179	118	Món 9	\N	\N	30000.00	available	f
1180	118	Món 10	\N	\N	25000.00	available	f
1181	119	Món 1	\N	\N	15000.00	available	f
1182	119	Món 2	\N	\N	45000.00	available	f
1183	119	Món 3	\N	\N	35000.00	available	f
1184	119	Món 4	\N	\N	15000.00	available	f
1185	119	Món 5	\N	\N	25000.00	available	f
1186	119	Món 6	\N	\N	35000.00	available	f
1187	119	Món 7	\N	\N	15000.00	available	f
1188	119	Món 8	\N	\N	45000.00	available	f
1189	119	Món 9	\N	\N	10000.00	available	f
1190	119	Món 10	\N	\N	15000.00	available	f
1191	120	Món 1	\N	\N	15000.00	available	f
1192	120	Món 2	\N	\N	35000.00	available	f
1193	120	Món 3	\N	\N	45000.00	available	f
1194	120	Món 4	\N	\N	40000.00	available	f
1195	120	Món 5	\N	\N	25000.00	available	f
1196	120	Món 6	\N	\N	15000.00	available	f
1197	120	Món 7	\N	\N	30000.00	available	f
1198	120	Món 8	\N	\N	50000.00	available	f
1199	120	Món 9	\N	\N	25000.00	available	f
1200	120	Món 10	\N	\N	15000.00	available	f
1201	121	Món 1	\N	\N	35000.00	available	f
1202	121	Món 2	\N	\N	10000.00	available	f
1203	121	Món 3	\N	\N	45000.00	available	f
1204	121	Món 4	\N	\N	30000.00	available	f
1205	121	Món 5	\N	\N	45000.00	available	f
1206	121	Món 6	\N	\N	40000.00	available	f
1207	121	Món 7	\N	\N	15000.00	available	f
1208	121	Món 8	\N	\N	30000.00	available	f
1209	121	Món 9	\N	\N	35000.00	available	f
1210	121	Món 10	\N	\N	35000.00	available	f
1211	122	Món 1	\N	\N	25000.00	available	f
1212	122	Món 2	\N	\N	40000.00	available	f
1213	122	Món 3	\N	\N	30000.00	available	f
1214	122	Món 4	\N	\N	25000.00	available	f
1215	122	Món 5	\N	\N	15000.00	available	f
1216	122	Món 6	\N	\N	20000.00	available	f
1217	122	Món 7	\N	\N	20000.00	available	f
1218	122	Món 8	\N	\N	50000.00	available	f
1219	122	Món 9	\N	\N	15000.00	available	f
1220	122	Món 10	\N	\N	35000.00	available	f
1221	123	Món 1	\N	\N	25000.00	available	f
1222	123	Món 2	\N	\N	10000.00	available	f
1223	123	Món 3	\N	\N	30000.00	available	f
1224	123	Món 4	\N	\N	10000.00	available	f
1225	123	Món 5	\N	\N	25000.00	available	f
1226	123	Món 6	\N	\N	35000.00	available	f
1227	123	Món 7	\N	\N	35000.00	available	f
1228	123	Món 8	\N	\N	50000.00	available	f
1229	123	Món 9	\N	\N	20000.00	available	f
1230	123	Món 10	\N	\N	30000.00	available	f
1231	124	Món 1	\N	\N	10000.00	available	f
1232	124	Món 2	\N	\N	30000.00	available	f
1233	124	Món 3	\N	\N	20000.00	available	f
1234	124	Món 4	\N	\N	15000.00	available	f
1235	124	Món 5	\N	\N	30000.00	available	f
1236	124	Món 6	\N	\N	45000.00	available	f
1237	124	Món 7	\N	\N	50000.00	available	f
1238	124	Món 8	\N	\N	50000.00	available	f
1239	124	Món 9	\N	\N	50000.00	available	f
1240	124	Món 10	\N	\N	40000.00	available	f
1241	125	Món 1	\N	\N	25000.00	available	f
1242	125	Món 2	\N	\N	50000.00	available	f
1243	125	Món 3	\N	\N	40000.00	available	f
1244	125	Món 4	\N	\N	30000.00	available	f
1245	125	Món 5	\N	\N	25000.00	available	f
1246	125	Món 6	\N	\N	10000.00	available	f
1247	125	Món 7	\N	\N	15000.00	available	f
1248	125	Món 8	\N	\N	35000.00	available	f
1249	125	Món 9	\N	\N	35000.00	available	f
1250	125	Món 10	\N	\N	25000.00	available	f
1251	126	Món 1	\N	\N	25000.00	available	f
1252	126	Món 2	\N	\N	40000.00	available	f
1253	126	Món 3	\N	\N	50000.00	available	f
1254	126	Món 4	\N	\N	40000.00	available	f
1255	126	Món 5	\N	\N	35000.00	available	f
1256	126	Món 6	\N	\N	10000.00	available	f
1257	126	Món 7	\N	\N	10000.00	available	f
1258	126	Món 8	\N	\N	15000.00	available	f
1259	126	Món 9	\N	\N	10000.00	available	f
1260	126	Món 10	\N	\N	40000.00	available	f
1261	127	Món 1	\N	\N	10000.00	available	f
1262	127	Món 2	\N	\N	20000.00	available	f
1263	127	Món 3	\N	\N	25000.00	available	f
1264	127	Món 4	\N	\N	15000.00	available	f
1265	127	Món 5	\N	\N	20000.00	available	f
1266	127	Món 6	\N	\N	10000.00	available	f
1267	127	Món 7	\N	\N	15000.00	available	f
1268	127	Món 8	\N	\N	35000.00	available	f
1269	127	Món 9	\N	\N	35000.00	available	f
1270	127	Món 10	\N	\N	40000.00	available	f
1271	128	Món 1	\N	\N	30000.00	available	f
1272	128	Món 2	\N	\N	50000.00	available	f
1273	128	Món 3	\N	\N	50000.00	available	f
1274	128	Món 4	\N	\N	35000.00	available	f
1275	128	Món 5	\N	\N	35000.00	available	f
1276	128	Món 6	\N	\N	15000.00	available	f
1277	128	Món 7	\N	\N	35000.00	available	f
1278	128	Món 8	\N	\N	40000.00	available	f
1279	128	Món 9	\N	\N	25000.00	available	f
1280	128	Món 10	\N	\N	40000.00	available	f
1281	129	Món 1	\N	\N	15000.00	available	f
1282	129	Món 2	\N	\N	15000.00	available	f
1283	129	Món 3	\N	\N	10000.00	available	f
1284	129	Món 4	\N	\N	40000.00	available	f
1285	129	Món 5	\N	\N	20000.00	available	f
1286	129	Món 6	\N	\N	15000.00	available	f
1287	129	Món 7	\N	\N	10000.00	available	f
1288	129	Món 8	\N	\N	20000.00	available	f
1289	129	Món 9	\N	\N	30000.00	available	f
1290	129	Món 10	\N	\N	10000.00	available	f
1291	130	Món 1	\N	\N	40000.00	available	f
1292	130	Món 2	\N	\N	35000.00	available	f
1293	130	Món 3	\N	\N	15000.00	available	f
1294	130	Món 4	\N	\N	45000.00	available	f
1295	130	Món 5	\N	\N	25000.00	available	f
1296	130	Món 6	\N	\N	40000.00	available	f
1297	130	Món 7	\N	\N	20000.00	available	f
1298	130	Món 8	\N	\N	10000.00	available	f
1299	130	Món 9	\N	\N	35000.00	available	f
1300	130	Món 10	\N	\N	40000.00	available	f
1301	131	Món 1	\N	\N	15000.00	available	f
1302	131	Món 2	\N	\N	40000.00	available	f
1303	131	Món 3	\N	\N	20000.00	available	f
1304	131	Món 4	\N	\N	10000.00	available	f
1305	131	Món 5	\N	\N	20000.00	available	f
1306	131	Món 6	\N	\N	50000.00	available	f
1307	131	Món 7	\N	\N	15000.00	available	f
1308	131	Món 8	\N	\N	45000.00	available	f
1309	131	Món 9	\N	\N	20000.00	available	f
1310	131	Món 10	\N	\N	25000.00	available	f
1311	132	Món 1	\N	\N	20000.00	available	f
1312	132	Món 2	\N	\N	10000.00	available	f
1313	132	Món 3	\N	\N	30000.00	available	f
1314	132	Món 4	\N	\N	10000.00	available	f
1315	132	Món 5	\N	\N	15000.00	available	f
1316	132	Món 6	\N	\N	45000.00	available	f
1317	132	Món 7	\N	\N	20000.00	available	f
1318	132	Món 8	\N	\N	40000.00	available	f
1319	132	Món 9	\N	\N	25000.00	available	f
1320	132	Món 10	\N	\N	45000.00	available	f
1321	133	Món 1	\N	\N	10000.00	available	f
1322	133	Món 2	\N	\N	50000.00	available	f
1323	133	Món 3	\N	\N	15000.00	available	f
1324	133	Món 4	\N	\N	40000.00	available	f
1325	133	Món 5	\N	\N	30000.00	available	f
1326	133	Món 6	\N	\N	45000.00	available	f
1327	133	Món 7	\N	\N	20000.00	available	f
1328	133	Món 8	\N	\N	35000.00	available	f
1329	133	Món 9	\N	\N	20000.00	available	f
1330	133	Món 10	\N	\N	45000.00	available	f
1331	134	Món 1	\N	\N	45000.00	available	f
1332	134	Món 2	\N	\N	25000.00	available	f
1333	134	Món 3	\N	\N	30000.00	available	f
1334	134	Món 4	\N	\N	35000.00	available	f
1335	134	Món 5	\N	\N	15000.00	available	f
1336	134	Món 6	\N	\N	30000.00	available	f
1337	134	Món 7	\N	\N	35000.00	available	f
1338	134	Món 8	\N	\N	25000.00	available	f
1339	134	Món 9	\N	\N	25000.00	available	f
1340	134	Món 10	\N	\N	10000.00	available	f
1341	135	Món 1	\N	\N	30000.00	available	f
1342	135	Món 2	\N	\N	30000.00	available	f
1343	135	Món 3	\N	\N	30000.00	available	f
1344	135	Món 4	\N	\N	50000.00	available	f
1345	135	Món 5	\N	\N	15000.00	available	f
1346	135	Món 6	\N	\N	25000.00	available	f
1347	135	Món 7	\N	\N	10000.00	available	f
1348	135	Món 8	\N	\N	10000.00	available	f
1349	135	Món 9	\N	\N	10000.00	available	f
1350	135	Món 10	\N	\N	45000.00	available	f
1351	136	Món 1	\N	\N	35000.00	available	f
1352	136	Món 2	\N	\N	45000.00	available	f
1353	136	Món 3	\N	\N	25000.00	available	f
1354	136	Món 4	\N	\N	50000.00	available	f
1355	136	Món 5	\N	\N	35000.00	available	f
1356	136	Món 6	\N	\N	10000.00	available	f
1357	136	Món 7	\N	\N	35000.00	available	f
1358	136	Món 8	\N	\N	50000.00	available	f
1359	136	Món 9	\N	\N	35000.00	available	f
1360	136	Món 10	\N	\N	30000.00	available	f
1361	137	Món 1	\N	\N	10000.00	available	f
1362	137	Món 2	\N	\N	50000.00	available	f
1363	137	Món 3	\N	\N	20000.00	available	f
1364	137	Món 4	\N	\N	30000.00	available	f
1365	137	Món 5	\N	\N	35000.00	available	f
1366	137	Món 6	\N	\N	40000.00	available	f
1367	137	Món 7	\N	\N	35000.00	available	f
1368	137	Món 8	\N	\N	45000.00	available	f
1369	137	Món 9	\N	\N	50000.00	available	f
1370	137	Món 10	\N	\N	20000.00	available	f
1371	138	Món 1	\N	\N	45000.00	available	f
1372	138	Món 2	\N	\N	35000.00	available	f
1373	138	Món 3	\N	\N	40000.00	available	f
1374	138	Món 4	\N	\N	25000.00	available	f
1375	138	Món 5	\N	\N	45000.00	available	f
1376	138	Món 6	\N	\N	15000.00	available	f
1377	138	Món 7	\N	\N	40000.00	available	f
1378	138	Món 8	\N	\N	40000.00	available	f
1379	138	Món 9	\N	\N	35000.00	available	f
1380	138	Món 10	\N	\N	35000.00	available	f
1381	139	Món 1	\N	\N	30000.00	available	f
1382	139	Món 2	\N	\N	45000.00	available	f
1383	139	Món 3	\N	\N	20000.00	available	f
1384	139	Món 4	\N	\N	10000.00	available	f
1385	139	Món 5	\N	\N	35000.00	available	f
1386	139	Món 6	\N	\N	35000.00	available	f
1387	139	Món 7	\N	\N	45000.00	available	f
1388	139	Món 8	\N	\N	20000.00	available	f
1389	139	Món 9	\N	\N	35000.00	available	f
1390	139	Món 10	\N	\N	10000.00	available	f
1391	140	Món 1	\N	\N	15000.00	available	f
1392	140	Món 2	\N	\N	25000.00	available	f
1393	140	Món 3	\N	\N	30000.00	available	f
1394	140	Món 4	\N	\N	30000.00	available	f
1395	140	Món 5	\N	\N	45000.00	available	f
1396	140	Món 6	\N	\N	30000.00	available	f
1397	140	Món 7	\N	\N	50000.00	available	f
1398	140	Món 8	\N	\N	50000.00	available	f
1399	140	Món 9	\N	\N	20000.00	available	f
1400	140	Món 10	\N	\N	35000.00	available	f
1401	141	Món 1	\N	\N	35000.00	available	f
1402	141	Món 2	\N	\N	35000.00	available	f
1403	141	Món 3	\N	\N	45000.00	available	f
1404	141	Món 4	\N	\N	45000.00	available	f
1405	141	Món 5	\N	\N	35000.00	available	f
1406	141	Món 6	\N	\N	10000.00	available	f
1407	141	Món 7	\N	\N	20000.00	available	f
1408	141	Món 8	\N	\N	20000.00	available	f
1409	141	Món 9	\N	\N	30000.00	available	f
1410	141	Món 10	\N	\N	25000.00	available	f
1411	142	Món 1	\N	\N	15000.00	available	f
1412	142	Món 2	\N	\N	15000.00	available	f
1413	142	Món 3	\N	\N	50000.00	available	f
1414	142	Món 4	\N	\N	25000.00	available	f
1415	142	Món 5	\N	\N	25000.00	available	f
1416	142	Món 6	\N	\N	25000.00	available	f
1417	142	Món 7	\N	\N	45000.00	available	f
1418	142	Món 8	\N	\N	35000.00	available	f
1419	142	Món 9	\N	\N	10000.00	available	f
1420	142	Món 10	\N	\N	30000.00	available	f
1421	143	Món 1	\N	\N	20000.00	available	f
1422	143	Món 2	\N	\N	15000.00	available	f
1423	143	Món 3	\N	\N	25000.00	available	f
1424	143	Món 4	\N	\N	10000.00	available	f
1425	143	Món 5	\N	\N	20000.00	available	f
1426	143	Món 6	\N	\N	35000.00	available	f
1427	143	Món 7	\N	\N	30000.00	available	f
1428	143	Món 8	\N	\N	30000.00	available	f
1429	143	Món 9	\N	\N	15000.00	available	f
1430	143	Món 10	\N	\N	30000.00	available	f
1431	144	Món 1	\N	\N	45000.00	available	f
1432	144	Món 2	\N	\N	35000.00	available	f
1433	144	Món 3	\N	\N	50000.00	available	f
1434	144	Món 4	\N	\N	10000.00	available	f
1435	144	Món 5	\N	\N	30000.00	available	f
1436	144	Món 6	\N	\N	50000.00	available	f
1437	144	Món 7	\N	\N	50000.00	available	f
1438	144	Món 8	\N	\N	15000.00	available	f
1439	144	Món 9	\N	\N	15000.00	available	f
1440	144	Món 10	\N	\N	40000.00	available	f
1441	145	Món 1	\N	\N	15000.00	available	f
1442	145	Món 2	\N	\N	40000.00	available	f
1443	145	Món 3	\N	\N	15000.00	available	f
1444	145	Món 4	\N	\N	45000.00	available	f
1445	145	Món 5	\N	\N	10000.00	available	f
1446	145	Món 6	\N	\N	15000.00	available	f
1447	145	Món 7	\N	\N	35000.00	available	f
1448	145	Món 8	\N	\N	40000.00	available	f
1449	145	Món 9	\N	\N	35000.00	available	f
1450	145	Món 10	\N	\N	30000.00	available	f
1451	146	Món 1	\N	\N	45000.00	available	f
1452	146	Món 2	\N	\N	30000.00	available	f
1453	146	Món 3	\N	\N	20000.00	available	f
1454	146	Món 4	\N	\N	40000.00	available	f
1455	146	Món 5	\N	\N	10000.00	available	f
1456	146	Món 6	\N	\N	25000.00	available	f
1457	146	Món 7	\N	\N	10000.00	available	f
1458	146	Món 8	\N	\N	15000.00	available	f
1459	146	Món 9	\N	\N	20000.00	available	f
1460	146	Món 10	\N	\N	50000.00	available	f
1461	147	Món 1	\N	\N	25000.00	available	f
1462	147	Món 2	\N	\N	15000.00	available	f
1463	147	Món 3	\N	\N	10000.00	available	f
1464	147	Món 4	\N	\N	15000.00	available	f
1465	147	Món 5	\N	\N	45000.00	available	f
1466	147	Món 6	\N	\N	35000.00	available	f
1467	147	Món 7	\N	\N	45000.00	available	f
1468	147	Món 8	\N	\N	10000.00	available	f
1469	147	Món 9	\N	\N	30000.00	available	f
1470	147	Món 10	\N	\N	45000.00	available	f
1471	148	Món 1	\N	\N	10000.00	available	f
1472	148	Món 2	\N	\N	50000.00	available	f
1473	148	Món 3	\N	\N	15000.00	available	f
1474	148	Món 4	\N	\N	30000.00	available	f
1475	148	Món 5	\N	\N	30000.00	available	f
1476	148	Món 6	\N	\N	30000.00	available	f
1477	148	Món 7	\N	\N	50000.00	available	f
1478	148	Món 8	\N	\N	25000.00	available	f
1479	148	Món 9	\N	\N	25000.00	available	f
1480	148	Món 10	\N	\N	10000.00	available	f
1481	149	Món 1	\N	\N	40000.00	available	f
1482	149	Món 2	\N	\N	45000.00	available	f
1483	149	Món 3	\N	\N	10000.00	available	f
1484	149	Món 4	\N	\N	20000.00	available	f
1485	149	Món 5	\N	\N	10000.00	available	f
1486	149	Món 6	\N	\N	45000.00	available	f
1487	149	Món 7	\N	\N	15000.00	available	f
1488	149	Món 8	\N	\N	15000.00	available	f
1489	149	Món 9	\N	\N	30000.00	available	f
1490	149	Món 10	\N	\N	20000.00	available	f
1491	150	Món 1	\N	\N	15000.00	available	f
1492	150	Món 2	\N	\N	40000.00	available	f
1493	150	Món 3	\N	\N	45000.00	available	f
1494	150	Món 4	\N	\N	20000.00	available	f
1495	150	Món 5	\N	\N	45000.00	available	f
1496	150	Món 6	\N	\N	10000.00	available	f
1497	150	Món 7	\N	\N	15000.00	available	f
1498	150	Món 8	\N	\N	25000.00	available	f
1499	150	Món 9	\N	\N	15000.00	available	f
1500	150	Món 10	\N	\N	20000.00	available	f
1501	151	Món 1	\N	\N	10000.00	available	f
1502	151	Món 2	\N	\N	20000.00	available	f
1503	151	Món 3	\N	\N	35000.00	available	f
1504	151	Món 4	\N	\N	45000.00	available	f
1505	151	Món 5	\N	\N	25000.00	available	f
1506	151	Món 6	\N	\N	25000.00	available	f
1507	151	Món 7	\N	\N	10000.00	available	f
1508	151	Món 8	\N	\N	35000.00	available	f
1509	151	Món 9	\N	\N	25000.00	available	f
1510	151	Món 10	\N	\N	10000.00	available	f
1511	152	Món 1	\N	\N	10000.00	available	f
1512	152	Món 2	\N	\N	30000.00	available	f
1513	152	Món 3	\N	\N	40000.00	available	f
1514	152	Món 4	\N	\N	25000.00	available	f
1515	152	Món 5	\N	\N	30000.00	available	f
1516	152	Món 6	\N	\N	50000.00	available	f
1517	152	Món 7	\N	\N	25000.00	available	f
1518	152	Món 8	\N	\N	45000.00	available	f
1519	152	Món 9	\N	\N	50000.00	available	f
1520	152	Món 10	\N	\N	15000.00	available	f
1521	153	Món 1	\N	\N	35000.00	available	f
1522	153	Món 2	\N	\N	10000.00	available	f
1523	153	Món 3	\N	\N	20000.00	available	f
1524	153	Món 4	\N	\N	25000.00	available	f
1525	153	Món 5	\N	\N	25000.00	available	f
1526	153	Món 6	\N	\N	40000.00	available	f
1527	153	Món 7	\N	\N	35000.00	available	f
1528	153	Món 8	\N	\N	35000.00	available	f
1529	153	Món 9	\N	\N	10000.00	available	f
1530	153	Món 10	\N	\N	45000.00	available	f
1531	154	Món 1	\N	\N	45000.00	available	f
1532	154	Món 2	\N	\N	35000.00	available	f
1533	154	Món 3	\N	\N	40000.00	available	f
1534	154	Món 4	\N	\N	15000.00	available	f
1535	154	Món 5	\N	\N	50000.00	available	f
1536	154	Món 6	\N	\N	15000.00	available	f
1537	154	Món 7	\N	\N	25000.00	available	f
1538	154	Món 8	\N	\N	20000.00	available	f
1539	154	Món 9	\N	\N	25000.00	available	f
1540	154	Món 10	\N	\N	15000.00	available	f
1541	155	Món 1	\N	\N	30000.00	available	f
1542	155	Món 2	\N	\N	30000.00	available	f
1543	155	Món 3	\N	\N	40000.00	available	f
1544	155	Món 4	\N	\N	20000.00	available	f
1545	155	Món 5	\N	\N	10000.00	available	f
1546	155	Món 6	\N	\N	50000.00	available	f
1547	155	Món 7	\N	\N	10000.00	available	f
1548	155	Món 8	\N	\N	50000.00	available	f
1549	155	Món 9	\N	\N	15000.00	available	f
1550	155	Món 10	\N	\N	25000.00	available	f
1551	156	Món 1	\N	\N	35000.00	available	f
1552	156	Món 2	\N	\N	30000.00	available	f
1553	156	Món 3	\N	\N	25000.00	available	f
1554	156	Món 4	\N	\N	30000.00	available	f
1555	156	Món 5	\N	\N	20000.00	available	f
1556	156	Món 6	\N	\N	25000.00	available	f
1557	156	Món 7	\N	\N	25000.00	available	f
1558	156	Món 8	\N	\N	25000.00	available	f
1559	156	Món 9	\N	\N	35000.00	available	f
1560	156	Món 10	\N	\N	35000.00	available	f
1561	157	Món 1	\N	\N	30000.00	available	f
1562	157	Món 2	\N	\N	50000.00	available	f
1563	157	Món 3	\N	\N	50000.00	available	f
1564	157	Món 4	\N	\N	30000.00	available	f
1565	157	Món 5	\N	\N	30000.00	available	f
1566	157	Món 6	\N	\N	20000.00	available	f
1567	157	Món 7	\N	\N	50000.00	available	f
1568	157	Món 8	\N	\N	20000.00	available	f
1569	157	Món 9	\N	\N	40000.00	available	f
1570	157	Món 10	\N	\N	10000.00	available	f
1571	158	Món 1	\N	\N	50000.00	available	f
1572	158	Món 2	\N	\N	35000.00	available	f
1573	158	Món 3	\N	\N	45000.00	available	f
1574	158	Món 4	\N	\N	50000.00	available	f
1575	158	Món 5	\N	\N	10000.00	available	f
1576	158	Món 6	\N	\N	45000.00	available	f
1577	158	Món 7	\N	\N	30000.00	available	f
1578	158	Món 8	\N	\N	35000.00	available	f
1579	158	Món 9	\N	\N	15000.00	available	f
1580	158	Món 10	\N	\N	10000.00	available	f
1581	159	Món 1	\N	\N	40000.00	available	f
1582	159	Món 2	\N	\N	15000.00	available	f
1583	159	Món 3	\N	\N	45000.00	available	f
1584	159	Món 4	\N	\N	50000.00	available	f
1585	159	Món 5	\N	\N	30000.00	available	f
1586	159	Món 6	\N	\N	15000.00	available	f
1587	159	Món 7	\N	\N	45000.00	available	f
1588	159	Món 8	\N	\N	20000.00	available	f
1589	159	Món 9	\N	\N	40000.00	available	f
1590	159	Món 10	\N	\N	30000.00	available	f
1591	160	Món 1	\N	\N	15000.00	available	f
1592	160	Món 2	\N	\N	15000.00	available	f
1593	160	Món 3	\N	\N	45000.00	available	f
1594	160	Món 4	\N	\N	15000.00	available	f
1595	160	Món 5	\N	\N	25000.00	available	f
1596	160	Món 6	\N	\N	30000.00	available	f
1597	160	Món 7	\N	\N	40000.00	available	f
1598	160	Món 8	\N	\N	15000.00	available	f
1599	160	Món 9	\N	\N	35000.00	available	f
1600	160	Món 10	\N	\N	20000.00	available	f
1601	161	Món 1	\N	\N	40000.00	available	f
1602	161	Món 2	\N	\N	45000.00	available	f
1603	161	Món 3	\N	\N	15000.00	available	f
1604	161	Món 4	\N	\N	20000.00	available	f
1605	161	Món 5	\N	\N	20000.00	available	f
1606	161	Món 6	\N	\N	35000.00	available	f
1607	161	Món 7	\N	\N	10000.00	available	f
1608	161	Món 8	\N	\N	20000.00	available	f
1609	161	Món 9	\N	\N	15000.00	available	f
1610	161	Món 10	\N	\N	25000.00	available	f
1611	162	Món 1	\N	\N	50000.00	available	f
1612	162	Món 2	\N	\N	40000.00	available	f
1613	162	Món 3	\N	\N	25000.00	available	f
1614	162	Món 4	\N	\N	35000.00	available	f
1615	162	Món 5	\N	\N	10000.00	available	f
1616	162	Món 6	\N	\N	15000.00	available	f
1617	162	Món 7	\N	\N	10000.00	available	f
1618	162	Món 8	\N	\N	50000.00	available	f
1619	162	Món 9	\N	\N	50000.00	available	f
1620	162	Món 10	\N	\N	15000.00	available	f
1621	163	Món 1	\N	\N	30000.00	available	f
1622	163	Món 2	\N	\N	40000.00	available	f
1623	163	Món 3	\N	\N	15000.00	available	f
1624	163	Món 4	\N	\N	50000.00	available	f
1625	163	Món 5	\N	\N	25000.00	available	f
1626	163	Món 6	\N	\N	15000.00	available	f
1627	163	Món 7	\N	\N	25000.00	available	f
1628	163	Món 8	\N	\N	25000.00	available	f
1629	163	Món 9	\N	\N	35000.00	available	f
1630	163	Món 10	\N	\N	50000.00	available	f
1631	164	Món 1	\N	\N	25000.00	available	f
1632	164	Món 2	\N	\N	10000.00	available	f
1633	164	Món 3	\N	\N	45000.00	available	f
1634	164	Món 4	\N	\N	40000.00	available	f
1635	164	Món 5	\N	\N	45000.00	available	f
1636	164	Món 6	\N	\N	25000.00	available	f
1637	164	Món 7	\N	\N	20000.00	available	f
1638	164	Món 8	\N	\N	50000.00	available	f
1639	164	Món 9	\N	\N	45000.00	available	f
1640	164	Món 10	\N	\N	20000.00	available	f
1641	165	Món 1	\N	\N	30000.00	available	f
1642	165	Món 2	\N	\N	35000.00	available	f
1643	165	Món 3	\N	\N	40000.00	available	f
1644	165	Món 4	\N	\N	25000.00	available	f
1645	165	Món 5	\N	\N	10000.00	available	f
1646	165	Món 6	\N	\N	40000.00	available	f
1647	165	Món 7	\N	\N	10000.00	available	f
1648	165	Món 8	\N	\N	15000.00	available	f
1649	165	Món 9	\N	\N	40000.00	available	f
1650	165	Món 10	\N	\N	30000.00	available	f
1651	166	Món 1	\N	\N	15000.00	available	f
1652	166	Món 2	\N	\N	40000.00	available	f
1653	166	Món 3	\N	\N	30000.00	available	f
1654	166	Món 4	\N	\N	30000.00	available	f
1655	166	Món 5	\N	\N	35000.00	available	f
1656	166	Món 6	\N	\N	40000.00	available	f
1657	166	Món 7	\N	\N	30000.00	available	f
1658	166	Món 8	\N	\N	10000.00	available	f
1659	166	Món 9	\N	\N	40000.00	available	f
1660	166	Món 10	\N	\N	35000.00	available	f
1661	167	Món 1	\N	\N	50000.00	available	f
1662	167	Món 2	\N	\N	20000.00	available	f
1663	167	Món 3	\N	\N	30000.00	available	f
1664	167	Món 4	\N	\N	20000.00	available	f
1665	167	Món 5	\N	\N	45000.00	available	f
1666	167	Món 6	\N	\N	25000.00	available	f
1667	167	Món 7	\N	\N	15000.00	available	f
1668	167	Món 8	\N	\N	10000.00	available	f
1669	167	Món 9	\N	\N	10000.00	available	f
1670	167	Món 10	\N	\N	20000.00	available	f
1671	168	Món 1	\N	\N	45000.00	available	f
1672	168	Món 2	\N	\N	20000.00	available	f
1673	168	Món 3	\N	\N	40000.00	available	f
1674	168	Món 4	\N	\N	20000.00	available	f
1675	168	Món 5	\N	\N	35000.00	available	f
1676	168	Món 6	\N	\N	25000.00	available	f
1677	168	Món 7	\N	\N	50000.00	available	f
1678	168	Món 8	\N	\N	10000.00	available	f
1679	168	Món 9	\N	\N	50000.00	available	f
1680	168	Món 10	\N	\N	35000.00	available	f
1681	169	Món 1	\N	\N	45000.00	available	f
1682	169	Món 2	\N	\N	20000.00	available	f
1683	169	Món 3	\N	\N	20000.00	available	f
1684	169	Món 4	\N	\N	10000.00	available	f
1685	169	Món 5	\N	\N	20000.00	available	f
1686	169	Món 6	\N	\N	50000.00	available	f
1687	169	Món 7	\N	\N	45000.00	available	f
1688	169	Món 8	\N	\N	15000.00	available	f
1689	169	Món 9	\N	\N	15000.00	available	f
1690	169	Món 10	\N	\N	50000.00	available	f
1691	170	Món 1	\N	\N	20000.00	available	f
1692	170	Món 2	\N	\N	50000.00	available	f
1693	170	Món 3	\N	\N	20000.00	available	f
1694	170	Món 4	\N	\N	35000.00	available	f
1695	170	Món 5	\N	\N	15000.00	available	f
1696	170	Món 6	\N	\N	30000.00	available	f
1697	170	Món 7	\N	\N	25000.00	available	f
1698	170	Món 8	\N	\N	25000.00	available	f
1699	170	Món 9	\N	\N	25000.00	available	f
1700	170	Món 10	\N	\N	20000.00	available	f
1701	171	Món 1	\N	\N	35000.00	available	f
1702	171	Món 2	\N	\N	30000.00	available	f
1703	171	Món 3	\N	\N	50000.00	available	f
1704	171	Món 4	\N	\N	25000.00	available	f
1705	171	Món 5	\N	\N	45000.00	available	f
1706	171	Món 6	\N	\N	40000.00	available	f
1707	171	Món 7	\N	\N	35000.00	available	f
1708	171	Món 8	\N	\N	25000.00	available	f
1709	171	Món 9	\N	\N	30000.00	available	f
1710	171	Món 10	\N	\N	40000.00	available	f
1711	172	Món 1	\N	\N	25000.00	available	f
1712	172	Món 2	\N	\N	50000.00	available	f
1713	172	Món 3	\N	\N	10000.00	available	f
1714	172	Món 4	\N	\N	40000.00	available	f
1715	172	Món 5	\N	\N	10000.00	available	f
1716	172	Món 6	\N	\N	30000.00	available	f
1717	172	Món 7	\N	\N	45000.00	available	f
1718	172	Món 8	\N	\N	10000.00	available	f
1719	172	Món 9	\N	\N	20000.00	available	f
1720	172	Món 10	\N	\N	20000.00	available	f
1721	173	Món 1	\N	\N	50000.00	available	f
1722	173	Món 2	\N	\N	20000.00	available	f
1723	173	Món 3	\N	\N	45000.00	available	f
1724	173	Món 4	\N	\N	35000.00	available	f
1725	173	Món 5	\N	\N	50000.00	available	f
1726	173	Món 6	\N	\N	10000.00	available	f
1727	173	Món 7	\N	\N	25000.00	available	f
1728	173	Món 8	\N	\N	20000.00	available	f
1729	173	Món 9	\N	\N	35000.00	available	f
1730	173	Món 10	\N	\N	50000.00	available	f
1731	174	Món 1	\N	\N	40000.00	available	f
1732	174	Món 2	\N	\N	40000.00	available	f
1733	174	Món 3	\N	\N	35000.00	available	f
1734	174	Món 4	\N	\N	15000.00	available	f
1735	174	Món 5	\N	\N	30000.00	available	f
1736	174	Món 6	\N	\N	10000.00	available	f
1737	174	Món 7	\N	\N	20000.00	available	f
1738	174	Món 8	\N	\N	25000.00	available	f
1739	174	Món 9	\N	\N	40000.00	available	f
1740	174	Món 10	\N	\N	15000.00	available	f
1741	175	Món 1	\N	\N	25000.00	available	f
1742	175	Món 2	\N	\N	30000.00	available	f
1743	175	Món 3	\N	\N	25000.00	available	f
1744	175	Món 4	\N	\N	40000.00	available	f
1745	175	Món 5	\N	\N	30000.00	available	f
1746	175	Món 6	\N	\N	15000.00	available	f
1747	175	Món 7	\N	\N	35000.00	available	f
1748	175	Món 8	\N	\N	30000.00	available	f
1749	175	Món 9	\N	\N	25000.00	available	f
1750	175	Món 10	\N	\N	15000.00	available	f
1751	176	Món 1	\N	\N	30000.00	available	f
1752	176	Món 2	\N	\N	35000.00	available	f
1753	176	Món 3	\N	\N	25000.00	available	f
1754	176	Món 4	\N	\N	30000.00	available	f
1755	176	Món 5	\N	\N	50000.00	available	f
1756	176	Món 6	\N	\N	30000.00	available	f
1757	176	Món 7	\N	\N	40000.00	available	f
1758	176	Món 8	\N	\N	30000.00	available	f
1759	176	Món 9	\N	\N	35000.00	available	f
1760	176	Món 10	\N	\N	15000.00	available	f
1761	177	Món 1	\N	\N	35000.00	available	f
1762	177	Món 2	\N	\N	15000.00	available	f
1763	177	Món 3	\N	\N	20000.00	available	f
1764	177	Món 4	\N	\N	30000.00	available	f
1765	177	Món 5	\N	\N	50000.00	available	f
1766	177	Món 6	\N	\N	35000.00	available	f
1767	177	Món 7	\N	\N	50000.00	available	f
1768	177	Món 8	\N	\N	35000.00	available	f
1769	177	Món 9	\N	\N	30000.00	available	f
1770	177	Món 10	\N	\N	10000.00	available	f
1771	178	Món 1	\N	\N	45000.00	available	f
1772	178	Món 2	\N	\N	50000.00	available	f
1773	178	Món 3	\N	\N	20000.00	available	f
1774	178	Món 4	\N	\N	40000.00	available	f
1775	178	Món 5	\N	\N	45000.00	available	f
1776	178	Món 6	\N	\N	15000.00	available	f
1777	178	Món 7	\N	\N	25000.00	available	f
1778	178	Món 8	\N	\N	25000.00	available	f
1779	178	Món 9	\N	\N	50000.00	available	f
1780	178	Món 10	\N	\N	30000.00	available	f
1781	179	Món 1	\N	\N	40000.00	available	f
1782	179	Món 2	\N	\N	30000.00	available	f
1783	179	Món 3	\N	\N	10000.00	available	f
1784	179	Món 4	\N	\N	25000.00	available	f
1785	179	Món 5	\N	\N	35000.00	available	f
1786	179	Món 6	\N	\N	35000.00	available	f
1787	179	Món 7	\N	\N	15000.00	available	f
1788	179	Món 8	\N	\N	30000.00	available	f
1789	179	Món 9	\N	\N	35000.00	available	f
1790	179	Món 10	\N	\N	40000.00	available	f
1791	180	Món 1	\N	\N	10000.00	available	f
1792	180	Món 2	\N	\N	45000.00	available	f
1793	180	Món 3	\N	\N	10000.00	available	f
1794	180	Món 4	\N	\N	40000.00	available	f
1795	180	Món 5	\N	\N	40000.00	available	f
1796	180	Món 6	\N	\N	35000.00	available	f
1797	180	Món 7	\N	\N	45000.00	available	f
1798	180	Món 8	\N	\N	10000.00	available	f
1799	180	Món 9	\N	\N	50000.00	available	f
1800	180	Món 10	\N	\N	45000.00	available	f
1801	181	Món 1	\N	\N	10000.00	available	f
1802	181	Món 2	\N	\N	10000.00	available	f
1803	181	Món 3	\N	\N	10000.00	available	f
1804	181	Món 4	\N	\N	50000.00	available	f
1805	181	Món 5	\N	\N	35000.00	available	f
1806	181	Món 6	\N	\N	35000.00	available	f
1807	181	Món 7	\N	\N	45000.00	available	f
1808	181	Món 8	\N	\N	25000.00	available	f
1809	181	Món 9	\N	\N	45000.00	available	f
1810	181	Món 10	\N	\N	20000.00	available	f
1811	182	Món 1	\N	\N	35000.00	available	f
1812	182	Món 2	\N	\N	35000.00	available	f
1813	182	Món 3	\N	\N	15000.00	available	f
1814	182	Món 4	\N	\N	30000.00	available	f
1815	182	Món 5	\N	\N	15000.00	available	f
1816	182	Món 6	\N	\N	20000.00	available	f
1817	182	Món 7	\N	\N	40000.00	available	f
1818	182	Món 8	\N	\N	45000.00	available	f
1819	182	Món 9	\N	\N	30000.00	available	f
1820	182	Món 10	\N	\N	30000.00	available	f
1821	183	Món 1	\N	\N	35000.00	available	f
1822	183	Món 2	\N	\N	10000.00	available	f
1823	183	Món 3	\N	\N	25000.00	available	f
1824	183	Món 4	\N	\N	20000.00	available	f
1825	183	Món 5	\N	\N	40000.00	available	f
1826	183	Món 6	\N	\N	25000.00	available	f
1827	183	Món 7	\N	\N	35000.00	available	f
1828	183	Món 8	\N	\N	50000.00	available	f
1829	183	Món 9	\N	\N	50000.00	available	f
1830	183	Món 10	\N	\N	10000.00	available	f
1831	184	Món 1	\N	\N	15000.00	available	f
1832	184	Món 2	\N	\N	35000.00	available	f
1833	184	Món 3	\N	\N	15000.00	available	f
1834	184	Món 4	\N	\N	40000.00	available	f
1835	184	Món 5	\N	\N	40000.00	available	f
1836	184	Món 6	\N	\N	40000.00	available	f
1837	184	Món 7	\N	\N	35000.00	available	f
1838	184	Món 8	\N	\N	35000.00	available	f
1839	184	Món 9	\N	\N	30000.00	available	f
1840	184	Món 10	\N	\N	25000.00	available	f
1841	185	Món 1	\N	\N	10000.00	available	f
1842	185	Món 2	\N	\N	45000.00	available	f
1843	185	Món 3	\N	\N	15000.00	available	f
1844	185	Món 4	\N	\N	10000.00	available	f
1845	185	Món 5	\N	\N	35000.00	available	f
1846	185	Món 6	\N	\N	10000.00	available	f
1847	185	Món 7	\N	\N	25000.00	available	f
1848	185	Món 8	\N	\N	45000.00	available	f
1849	185	Món 9	\N	\N	25000.00	available	f
1850	185	Món 10	\N	\N	20000.00	available	f
1851	186	Món 1	\N	\N	50000.00	available	f
1852	186	Món 2	\N	\N	50000.00	available	f
1853	186	Món 3	\N	\N	10000.00	available	f
1854	186	Món 4	\N	\N	10000.00	available	f
1855	186	Món 5	\N	\N	30000.00	available	f
1856	186	Món 6	\N	\N	50000.00	available	f
1857	186	Món 7	\N	\N	20000.00	available	f
1858	186	Món 8	\N	\N	20000.00	available	f
1859	186	Món 9	\N	\N	50000.00	available	f
1860	186	Món 10	\N	\N	40000.00	available	f
1861	187	Món 1	\N	\N	25000.00	available	f
1862	187	Món 2	\N	\N	20000.00	available	f
1863	187	Món 3	\N	\N	30000.00	available	f
1864	187	Món 4	\N	\N	20000.00	available	f
1865	187	Món 5	\N	\N	45000.00	available	f
1866	187	Món 6	\N	\N	20000.00	available	f
1867	187	Món 7	\N	\N	15000.00	available	f
1868	187	Món 8	\N	\N	45000.00	available	f
1869	187	Món 9	\N	\N	20000.00	available	f
1870	187	Món 10	\N	\N	15000.00	available	f
1871	188	Món 1	\N	\N	35000.00	available	f
1872	188	Món 2	\N	\N	20000.00	available	f
1873	188	Món 3	\N	\N	40000.00	available	f
1874	188	Món 4	\N	\N	35000.00	available	f
1875	188	Món 5	\N	\N	20000.00	available	f
1876	188	Món 6	\N	\N	15000.00	available	f
1877	188	Món 7	\N	\N	35000.00	available	f
1878	188	Món 8	\N	\N	10000.00	available	f
1879	188	Món 9	\N	\N	35000.00	available	f
1880	188	Món 10	\N	\N	25000.00	available	f
1881	189	Món 1	\N	\N	20000.00	available	f
1882	189	Món 2	\N	\N	10000.00	available	f
1883	189	Món 3	\N	\N	50000.00	available	f
1884	189	Món 4	\N	\N	50000.00	available	f
1885	189	Món 5	\N	\N	20000.00	available	f
1886	189	Món 6	\N	\N	30000.00	available	f
1887	189	Món 7	\N	\N	15000.00	available	f
1888	189	Món 8	\N	\N	40000.00	available	f
1889	189	Món 9	\N	\N	25000.00	available	f
1890	189	Món 10	\N	\N	25000.00	available	f
1891	190	Món 1	\N	\N	15000.00	available	f
1892	190	Món 2	\N	\N	35000.00	available	f
1893	190	Món 3	\N	\N	30000.00	available	f
1894	190	Món 4	\N	\N	10000.00	available	f
1895	190	Món 5	\N	\N	10000.00	available	f
1896	190	Món 6	\N	\N	25000.00	available	f
1897	190	Món 7	\N	\N	30000.00	available	f
1898	190	Món 8	\N	\N	40000.00	available	f
1899	190	Món 9	\N	\N	35000.00	available	f
1900	190	Món 10	\N	\N	15000.00	available	f
1901	191	Món 1	\N	\N	50000.00	available	f
1902	191	Món 2	\N	\N	10000.00	available	f
1903	191	Món 3	\N	\N	15000.00	available	f
1904	191	Món 4	\N	\N	10000.00	available	f
1905	191	Món 5	\N	\N	10000.00	available	f
1906	191	Món 6	\N	\N	10000.00	available	f
1907	191	Món 7	\N	\N	20000.00	available	f
1908	191	Món 8	\N	\N	10000.00	available	f
1909	191	Món 9	\N	\N	30000.00	available	f
1910	191	Món 10	\N	\N	30000.00	available	f
1911	192	Món 1	\N	\N	45000.00	available	f
1912	192	Món 2	\N	\N	25000.00	available	f
1913	192	Món 3	\N	\N	25000.00	available	f
1914	192	Món 4	\N	\N	15000.00	available	f
1915	192	Món 5	\N	\N	30000.00	available	f
1916	192	Món 6	\N	\N	25000.00	available	f
1917	192	Món 7	\N	\N	45000.00	available	f
1918	192	Món 8	\N	\N	45000.00	available	f
1919	192	Món 9	\N	\N	45000.00	available	f
1920	192	Món 10	\N	\N	20000.00	available	f
1921	193	Món 1	\N	\N	35000.00	available	f
1922	193	Món 2	\N	\N	40000.00	available	f
1923	193	Món 3	\N	\N	10000.00	available	f
1924	193	Món 4	\N	\N	30000.00	available	f
1925	193	Món 5	\N	\N	30000.00	available	f
1926	193	Món 6	\N	\N	35000.00	available	f
1927	193	Món 7	\N	\N	35000.00	available	f
1928	193	Món 8	\N	\N	30000.00	available	f
1929	193	Món 9	\N	\N	25000.00	available	f
1930	193	Món 10	\N	\N	30000.00	available	f
1931	194	Món 1	\N	\N	35000.00	available	f
1932	194	Món 2	\N	\N	40000.00	available	f
1933	194	Món 3	\N	\N	35000.00	available	f
1934	194	Món 4	\N	\N	40000.00	available	f
1935	194	Món 5	\N	\N	25000.00	available	f
1936	194	Món 6	\N	\N	45000.00	available	f
1937	194	Món 7	\N	\N	10000.00	available	f
1938	194	Món 8	\N	\N	20000.00	available	f
1939	194	Món 9	\N	\N	50000.00	available	f
1940	194	Món 10	\N	\N	20000.00	available	f
1941	195	Món 1	\N	\N	45000.00	available	f
1942	195	Món 2	\N	\N	10000.00	available	f
1943	195	Món 3	\N	\N	25000.00	available	f
1944	195	Món 4	\N	\N	15000.00	available	f
1945	195	Món 5	\N	\N	25000.00	available	f
1946	195	Món 6	\N	\N	50000.00	available	f
1947	195	Món 7	\N	\N	15000.00	available	f
1948	195	Món 8	\N	\N	20000.00	available	f
1949	195	Món 9	\N	\N	10000.00	available	f
1950	195	Món 10	\N	\N	35000.00	available	f
1951	196	Món 1	\N	\N	50000.00	available	f
1952	196	Món 2	\N	\N	45000.00	available	f
1953	196	Món 3	\N	\N	10000.00	available	f
1954	196	Món 4	\N	\N	35000.00	available	f
1955	196	Món 5	\N	\N	35000.00	available	f
1956	196	Món 6	\N	\N	15000.00	available	f
1957	196	Món 7	\N	\N	25000.00	available	f
1958	196	Món 8	\N	\N	20000.00	available	f
1959	196	Món 9	\N	\N	45000.00	available	f
1960	196	Món 10	\N	\N	30000.00	available	f
1961	197	Món 1	\N	\N	10000.00	available	f
1962	197	Món 2	\N	\N	30000.00	available	f
1963	197	Món 3	\N	\N	35000.00	available	f
1964	197	Món 4	\N	\N	25000.00	available	f
1965	197	Món 5	\N	\N	50000.00	available	f
1966	197	Món 6	\N	\N	20000.00	available	f
1967	197	Món 7	\N	\N	30000.00	available	f
1968	197	Món 8	\N	\N	25000.00	available	f
1969	197	Món 9	\N	\N	25000.00	available	f
1970	197	Món 10	\N	\N	40000.00	available	f
1971	198	Món 1	\N	\N	20000.00	available	f
1972	198	Món 2	\N	\N	30000.00	available	f
1973	198	Món 3	\N	\N	30000.00	available	f
1974	198	Món 4	\N	\N	25000.00	available	f
1975	198	Món 5	\N	\N	50000.00	available	f
1976	198	Món 6	\N	\N	40000.00	available	f
1977	198	Món 7	\N	\N	20000.00	available	f
1978	198	Món 8	\N	\N	50000.00	available	f
1979	198	Món 9	\N	\N	15000.00	available	f
1980	198	Món 10	\N	\N	50000.00	available	f
1981	199	Món 1	\N	\N	50000.00	available	f
1982	199	Món 2	\N	\N	15000.00	available	f
1983	199	Món 3	\N	\N	40000.00	available	f
1984	199	Món 4	\N	\N	30000.00	available	f
1985	199	Món 5	\N	\N	25000.00	available	f
1986	199	Món 6	\N	\N	40000.00	available	f
1987	199	Món 7	\N	\N	40000.00	available	f
1988	199	Món 8	\N	\N	10000.00	available	f
1989	199	Món 9	\N	\N	35000.00	available	f
1990	199	Món 10	\N	\N	20000.00	available	f
1991	200	Món 1	\N	\N	40000.00	available	f
1992	200	Món 2	\N	\N	10000.00	available	f
1993	200	Món 3	\N	\N	40000.00	available	f
1994	200	Món 4	\N	\N	25000.00	available	f
1995	200	Món 5	\N	\N	15000.00	available	f
1996	200	Món 6	\N	\N	45000.00	available	f
1997	200	Món 7	\N	\N	50000.00	available	f
1998	200	Món 8	\N	\N	15000.00	available	f
1999	200	Món 9	\N	\N	10000.00	available	f
2000	200	Món 10	\N	\N	15000.00	available	f
2005	212	Bún cá rô đồng	\N	\N	30000.00	available	t
2010	212	Bánh đa cua	\N	Bánh đa cua, chả cá, chả lá lốt, nước dùng đặc biệt	40000.00	available	t
2009	212	Bánh đa cua	\N	Bánh đa cua, chả cá, chả lá lốt, nước dùng đặc biệt	40000.00	available	t
2008	212	Bánh đa cua	\N	Bánh đa cua, chả cá, chả lá lốt, nước dùng đặc biệt	40000.00	available	t
2011	212	Trà đá	\N		3000.00	available	f
181	19	Chả cá lá lốt	\N	\N	30000.00	available	f
189	19	Coca	\N	\N	15000.00	available	f
2012	215	Matcha nướng	\N	Ánh bảo uống xong đau bụng	50000.00	available	f
2007	212	Bún bò	\N	Sợi bún to cùng thịt bò thơm ngon	40000.00	available	f
2004	212	Bún cá	\N	\N	35000.00	available	f
2014	215	Matcha Latte	\N	Món này được anh Duy gợi ý	55000.00	available	f
2006	212	Bún mọc	\N	\N	30000.00	available	f
2003	212	Bánh đa cá	\N	Sợi bánh đa nâu thơm ngon, cá rán giòn cùng chả cá	35000.00	available	f
2015	215	Matcha Avada Kedavra	\N	Nghe cũng vần	99999999.00	available	f
71	8	Món 1	\N	\N	50000.00	available	t
74	8	Món 4	\N	\N	20000.00	available	t
2013	215	Matcha luộc	\N	Tôi cũng không biết vì sao thực đơn có món này	45000.00	available	f
\.


--
-- Data for Name: merchants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.merchants (merchant_id, name, is_deleted) FROM stdin;
1	Merchant 1	f
2	Merchant 2	f
3	Merchant 3	f
5	Merchant 5	f
6	Merchant 6	f
7	Merchant 7	f
8	Merchant 8	f
9	Merchant 9	f
10	Merchant 10	f
12	Merchant 12	f
14	Merchant 14	f
15	Merchant 15	f
16	Merchant 16	f
20	Merchant 20	f
23	Merchant 23	f
24	Merchant 24	f
25	Merchant 25	f
26	Merchant 26	f
27	Merchant 27	f
28	Merchant 28	f
30	Merchant 30	f
31	Merchant 31	f
32	Merchant 32	f
33	Merchant 33	f
36	Merchant 36	f
37	Merchant 37	f
39	Merchant 39	f
40	Merchant 40	f
41	Merchant 41	f
42	Merchant 42	f
47	Merchant 47	f
50	Merchant 50	f
54	Merchant 54	f
55	Merchant 55	f
57	Merchant 57	f
58	Merchant 58	f
59	Merchant 59	f
60	Merchant 60	f
61	Merchant 61	f
64	Merchant 64	f
65	Merchant 65	f
66	Merchant 66	f
67	Merchant 67	f
69	Merchant 69	f
70	Merchant 70	f
72	Merchant 72	f
74	Merchant 74	f
75	Merchant 75	f
79	Merchant 79	f
80	Merchant 80	f
81	Merchant 81	f
84	Merchant 84	f
88	Merchant 88	f
89	Merchant 89	f
90	Merchant 90	f
91	Merchant 91	f
93	Merchant 93	f
94	Merchant 94	f
96	Merchant 96	f
98	Merchant 98	f
99	Merchant 99	f
101	Merchant 101	f
102	Merchant 102	f
103	Merchant 103	f
105	Merchant 105	f
106	Merchant 106	f
107	Merchant 107	f
108	Merchant 108	f
109	Merchant 109	f
111	Merchant 111	f
112	Merchant 112	f
114	Merchant 114	f
115	Merchant 115	f
116	Merchant 116	f
117	Merchant 117	f
118	Merchant 118	f
119	Merchant 119	f
120	Merchant 120	f
121	Merchant 121	f
123	Merchant 123	f
124	Merchant 124	f
125	Merchant 125	f
126	Merchant 126	f
129	Merchant 129	f
130	Merchant 130	f
131	Merchant 131	f
132	Merchant 132	f
134	Merchant 134	f
135	Merchant 135	f
138	Merchant 138	f
142	Merchant 142	f
144	Merchant 144	f
147	Merchant 147	f
149	Merchant 149	f
150	Merchant 150	f
151	Merchant 151	f
152	Merchant 152	f
155	Merchant 155	f
156	Merchant 156	f
158	Merchant 158	f
159	Merchant 159	f
160	Merchant 160	f
161	Merchant 161	f
163	Merchant 163	f
165	Merchant 165	f
168	Merchant 168	f
170	Merchant 170	f
172	Merchant 172	f
175	Merchant 175	f
176	Merchant 176	f
177	Merchant 177	f
180	Merchant 180	f
181	Merchant 181	f
186	Merchant 186	f
187	Merchant 187	f
188	Merchant 188	f
189	Merchant 189	f
190	Merchant 190	f
191	Merchant 191	f
192	Merchant 192	f
193	Merchant 193	f
194	Merchant 194	f
195	Merchant 195	f
198	Merchant 198	f
199	Merchant 199	f
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (item_id, order_id, price, quantity) FROM stdin;
298	1	40000.00	2
291	1	15000.00	1
300	1	15000.00	2
317	2	10000.00	2
319	2	20000.00	3
232	3	10000.00	2
233	3	35000.00	2
391	4	50000.00	1
397	4	25000.00	1
396	4	40000.00	2
379	5	15000.00	3
373	5	10000.00	2
390	6	50000.00	1
382	6	35000.00	1
367	7	25000.00	2
241	8	15000.00	1
245	8	10000.00	3
249	8	45000.00	3
351	9	40000.00	2
281	10	20000.00	2
283	10	15000.00	1
383	11	10000.00	3
332	12	15000.00	3
337	12	20000.00	1
212	13	20000.00	1
217	13	40000.00	1
377	14	40000.00	3
376	14	10000.00	3
310	15	25000.00	3
302	15	10000.00	3
335	16	25000.00	3
219	17	40000.00	2
213	17	45000.00	3
252	18	40000.00	2
332	19	15000.00	2
280	20	25000.00	2
276	20	40000.00	1
271	20	50000.00	1
262	21	15000.00	1
261	21	30000.00	2
263	21	40000.00	3
396	22	40000.00	2
397	22	25000.00	1
337	23	20000.00	1
333	23	25000.00	3
388	24	30000.00	2
399	25	15000.00	1
393	26	10000.00	3
215	27	35000.00	1
382	28	35000.00	3
262	29	15000.00	2
268	29	50000.00	3
267	29	20000.00	2
339	30	15000.00	3
250	31	15000.00	1
326	32	30000.00	1
251	33	20000.00	3
254	33	35000.00	1
366	34	10000.00	3
361	34	50000.00	1
380	35	35000.00	3
308	36	20000.00	3
310	36	25000.00	3
356	37	25000.00	2
352	37	25000.00	2
235	38	40000.00	1
262	39	15000.00	1
263	39	40000.00	2
355	40	25000.00	1
265	41	20000.00	1
269	41	25000.00	2
267	41	20000.00	1
366	42	10000.00	2
247	43	25000.00	3
241	43	15000.00	2
246	43	30000.00	2
231	44	50000.00	3
239	44	35000.00	1
357	45	45000.00	1
378	46	50000.00	1
312	47	10000.00	1
316	47	30000.00	3
320	47	25000.00	1
248	48	50000.00	3
244	48	25000.00	3
243	48	20000.00	2
285	49	40000.00	3
286	49	15000.00	1
201	50	25000.00	1
203	50	35000.00	3
385	51	15000.00	3
388	51	30000.00	3
390	51	50000.00	1
393	52	10000.00	2
387	53	45000.00	3
385	53	15000.00	3
267	54	20000.00	1
265	54	20000.00	3
268	54	50000.00	2
365	55	30000.00	1
262	56	15000.00	1
263	56	40000.00	2
270	56	20000.00	2
306	57	25000.00	2
210	58	15000.00	3
345	59	10000.00	2
347	59	10000.00	1
344	59	10000.00	2
298	60	40000.00	1
294	60	10000.00	3
346	61	50000.00	1
305	62	10000.00	2
302	62	10000.00	3
354	64	20000.00	1
292	65	40000.00	2
291	65	15000.00	1
294	65	10000.00	1
335	66	25000.00	2
338	66	15000.00	2
339	66	15000.00	2
290	67	40000.00	2
283	67	15000.00	2
242	68	10000.00	2
275	69	40000.00	3
276	69	40000.00	3
388	70	30000.00	1
203	71	35000.00	2
334	72	15000.00	1
331	72	30000.00	1
236	73	30000.00	2
238	73	35000.00	2
318	75	20000.00	3
337	76	20000.00	3
340	76	45000.00	2
331	76	30000.00	2
314	77	25000.00	1
313	77	10000.00	3
261	78	30000.00	3
266	78	10000.00	1
265	78	20000.00	2
290	79	40000.00	2
279	80	40000.00	2
280	80	25000.00	2
207	81	35000.00	3
205	81	40000.00	3
210	81	15000.00	2
302	82	10000.00	1
318	83	20000.00	1
275	84	40000.00	3
271	84	50000.00	2
287	85	35000.00	3
358	87	15000.00	3
253	88	45000.00	3
261	89	30000.00	3
264	89	10000.00	2
258	90	50000.00	3
251	90	20000.00	2
260	90	15000.00	2
296	91	35000.00	3
299	91	40000.00	1
294	91	10000.00	2
362	93	10000.00	1
368	93	50000.00	1
363	93	35000.00	2
242	94	10000.00	3
249	94	45000.00	2
394	95	40000.00	2
397	95	25000.00	1
400	95	50000.00	2
383	96	10000.00	2
327	97	10000.00	3
323	97	20000.00	2
256	98	10000.00	1
337	99	20000.00	2
333	99	25000.00	3
331	99	30000.00	1
339	100	15000.00	2
335	100	25000.00	1
2003	103	35000.00	2
2004	103	35000.00	1
2004	104	35000.00	3
2006	104	30000.00	1
2004	105	35000.00	2
2006	105	30000.00	2
2004	106	35000.00	2
2007	106	40000.00	1
2007	107	40000.00	2
2007	108	40000.00	2
2006	108	30000.00	1
2007	109	40000.00	2
2006	109	30000.00	1
211	110	25000.00	1
2013	111	45000.00	3
2014	111	55000.00	1
642	112	45000.00	1
641	112	50000.00	3
243	113	20000.00	1
244	113	25000.00	1
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, customer_id, restaurant_id, driver_id, address, delivery_fee, food_fee, order_status, created_at, delivered_at, note, distance, x, y) FROM stdin;
4	10	40	42	27, Tu Hoa, Tay Ho, Hanoi	32400.00	155000.00	completed	2025-01-03 23:46:24.13421	2025-01-04 00:03:24.13421	\N	6.6	21.0602857	105.8307796
27	8	22	59	7-9, Phố Hàng Vôi, Hà Nội	14000.00	35000.00	completed	2025-01-01 12:14:24.13421	2025-01-01 13:03:24.13421	\N	1.3	21.0305739	105.8564189
35	20	38	42	27, Hàng Bè, Hà Nội	38000.00	105000.00	completed	2025-01-01 14:33:24.13421	2025-01-01 15:05:24.13421	\N	8.0	21.0330675	105.8539845
47	14	32	52	55, Đường Thành, Hà Nội	27600.00	125000.00	completed	2024-12-30 07:04:24.13421	2024-12-30 07:23:24.13421	\N	5.4	21.0312401	105.8472175
57	13	31	49	21, Bát Đàn, Hoàn Kiếm, Hà Nội	14000.00	50000.00	completed	2025-01-02 23:47:24.13421	2025-01-03 00:31:24.13421	\N	0.9	21.0336722	105.8474267
73	7	24	55	34, Hàng Quạt, Hà Nội	14000.00	130000.00	completed	2024-12-28 00:51:24.13421	2024-12-28 01:06:24.13421	\N	0.4	21.0328812	105.8495832
87	12	36	60	2, Ngọc Hà, Quận Ba Đình	14800.00	45000.00	completed	2024-12-29 03:30:24.13421	2024-12-29 04:29:24.13421	\N	2.2	21.0379001	105.8302026
76	7	34	57	9, Phố Văn Miếu, Đống Đa, Hà Nội	29200.00	210000.00	completed	2025-01-03 22:27:24.13421	2025-01-03 23:25:24.13421	\N	5.8	21.0296628	105.8369362
77	3	32	52	54b, Phố Quốc Tử Giám, Hà Nội	27200.00	55000.00	completed	2024-12-30 11:58:24.13421	2024-12-30 12:08:24.13421	\N	5.3	21.0266394	105.8370864
78	8	27	55	33, Phố Văn Miếu, Đống Đa, Hà Nội	19200.00	140000.00	completed	2025-01-01 20:42:24.13421	2025-01-01 21:36:24.13421	\N	3.3	21.0284360	105.8364664
79	8	29	42	4, Nguyễn Bỉnh Khiêm	29200.00	80000.00	completed	2025-01-03 16:33:24.13421	2025-01-03 16:41:24.13421	\N	5.8	21.0178763	105.8484118
80	20	28	57	307a, Bạch mai	38000.00	130000.00	completed	2025-01-01 09:59:24.13421	2025-01-01 10:46:24.13421	\N	8.0	21.0018770	105.8508490
33	5	26	52	25, Hàng Bè	27200.00	95000.00	completed	2025-01-01 21:51:24.13421	2025-01-01 22:29:24.13421	\N	5.3	21.0331010	105.8539305
81	6	21	53	112D1, Phố Đặng Văn Ngữ	24000.00	255000.00	completed	2025-01-04 00:07:24.13421	2025-01-04 00:57:24.13421	\N	4.5	21.0113900	105.8315520
82	13	31	41	5, Nhà Thờ	17200.00	10000.00	completed	2025-01-01 05:10:24.13421	2025-01-01 05:23:24.13421	\N	2.8	21.0284992	105.8484194
83	7	32	49	34, Hàng Hành, Hà Nội	27600.00	20000.00	completed	2024-12-31 00:58:24.13421	2024-12-31 01:38:24.13421	\N	5.4	21.0314317	105.8502016
84	6	28	52	19, Phố Hàng Cháo, Đống Đa, Hà Nội	18400.00	220000.00	completed	2024-12-29 22:49:24.13421	2024-12-29 23:49:24.13421	\N	3.1	21.0295866	105.8349908
85	13	29	59	TT Bo Y Te, dôc Tho Lao	36000.00	105000.00	completed	2024-12-27 16:43:24.13421	2024-12-27 16:44:24.13421	\N	7.5	21.0102885	105.8577081
88	18	26	54	49, Đại Cồ Việt, Hai Bà Trưng	26400.00	135000.00	completed	2024-12-28 21:53:24.13421	2024-12-28 22:08:24.13421	\N	5.1	21.0075968	105.8479073
89	15	27	58	76, Đường Nguyễn Trãi, Thanh Xuân	24800.00	110000.00	completed	2024-12-29 07:49:24.13421	2024-12-29 08:47:24.13421	\N	4.7	21.0003066	105.8154460
90	11	26	45	20, Phố Lê Trọng Tấn, Thanh Xuân	26400.00	220000.00	completed	2024-12-28 08:13:24.13421	2024-12-28 08:13:24.13421	\N	5.1	21.0004319	105.8280824
91	1	30	58	157, Đường Giải Phóng, Hai Bà Trưng	41600.00	165000.00	completed	2025-01-02 04:17:24.13421	2025-01-02 04:41:24.13421	\N	8.9	21.0016082	105.8416619
93	12	37	57	27, Phố Lạc Trung, Hai Bà Trưng	30000.00	130000.00	completed	2024-12-27 12:19:24.13421	2024-12-27 12:46:24.13421	\N	6.0	21.0027545	105.8654674
100	9	34	49	344, Phố Bà Triệu, Hai Bà Trưng	40800.00	55000.00	completed	2024-12-29 22:04:24.13421	2024-12-29 22:45:24.13421	\N	8.7	21.0088566	105.8488292
2	12	32	53	118, Đường Nguyễn Khánh Toàn, Cau Giay, Hà Nội	38400.00	80000.00	completed	2024-12-28 03:46:24.13421	2024-12-28 04:39:24.13421	\N	8.1	21.0378611	105.8010007
3	7	24	56	96 Ái Mộ,Phường Bồ Đề,Quận Long Biên,Thành phố Hà Nội, 96 Ái Mộ,Phường Bồ Đề,Quận Long Biên,Thành phố Hà Nội	19600.00	90000.00	completed	2025-01-03 16:30:24.13421	2025-01-03 16:53:24.13421	\N	3.4	21.0405865	105.8738462
5	5	38	42	49, Phố Hai Bà Trưng, Hoàn Kiếm, Hà Nội	32800.00	65000.00	completed	2025-01-03 19:56:24.13421	2025-01-03 20:10:24.13421	\N	6.7	21.0258326	105.8463672
6	19	39	58	7, Phố Chùa Bộc	30400.00	85000.00	completed	2024-12-31 00:38:24.13421	2024-12-31 01:20:24.13421	\N	6.1	21.0063661	105.8305260
7	4	37	59	48, Hàng Ngang, Hà Nội	14800.00	50000.00	completed	2025-01-02 19:24:24.13421	2025-01-02 19:47:24.13421	\N	2.2	21.0343278	105.8504388
8	8	25	47	Tầng 8, Đường Trần Khát Chân, Hai Bà Trưng, Hà Nội	14000.00	180000.00	completed	2024-12-29 21:58:24.13421	2024-12-29 22:16:24.13421	\N	1.7	21.0093019	105.8549177
9	17	36	54	405, Đường Nguyễn Văn Cừ	32800.00	80000.00	completed	2024-12-29 08:28:24.13421	2024-12-29 08:58:24.13421	\N	6.7	21.0470606	105.8781666
10	9	29	42	49, Lương Ngọc Quyến, Hà Nội	29600.00	55000.00	completed	2025-01-03 16:37:24.13421	2025-01-03 16:40:24.13421	\N	5.9	21.0346495	105.8517404
11	13	39	42	16, Lương Văn Can, Hà Nội	14000.00	30000.00	completed	2024-12-28 00:08:24.13421	2024-12-28 00:15:24.13421	\N	1.7	21.0334478	105.8500291
12	5	34	58	11, Bát Đàn, Hà Nội	30800.00	65000.00	completed	2025-01-01 01:50:24.13421	2025-01-01 02:05:24.13421	\N	6.2	21.0336770	105.8476149
13	2	22	48	41, Hàng Bè, Hà Nội	14000.00	60000.00	completed	2024-12-30 05:31:24.13421	2024-12-30 06:04:24.13421	\N	0.7	21.0328310	105.8539652
14	4	38	51	21, Phố Hàng Gai	36400.00	150000.00	completed	2024-12-29 20:01:24.13421	2024-12-29 20:46:24.13421	\N	7.6	21.0321895	105.8509370
15	9	31	52	72, Mã Mây	14000.00	105000.00	completed	2024-12-29 21:46:24.13421	2024-12-29 22:06:24.13421	\N	0.2	21.0346545	105.8533590
16	16	34	43	18, Phố Phan Bội Châu	31600.00	75000.00	completed	2024-12-31 08:57:24.13421	2024-12-31 09:38:24.13421	\N	6.4	21.0262611	105.8434161
17	9	22	42	5, Hàng Bè	14000.00	215000.00	completed	2024-12-31 16:00:24.13421	2024-12-31 16:38:24.13421	\N	0.6	21.0335956	105.8538909
18	3	26	60	33, Phố Trần Hưng Đạo, Hoàn Kiếm, Hà Nội	26800.00	80000.00	completed	2024-12-29 12:15:24.13421	2024-12-29 12:32:24.13421	\N	5.2	21.0202197	105.8543053
19	2	34	46	6a, Phố Cao Bá Quát	30000.00	30000.00	completed	2024-12-29 13:58:24.13421	2024-12-29 14:42:24.13421	\N	6.0	21.0298564	105.8409205
20	13	28	54	10, Nam Ngư	22800.00	140000.00	completed	2025-01-03 10:56:24.13421	2025-01-03 11:30:24.13421	\N	4.2	21.0265884	105.8432573
21	15	27	42	32, Mã Mây, Hoàn Kiếm, Hà Nội	30800.00	195000.00	completed	2024-12-28 11:34:24.13421	2024-12-28 11:35:24.13421	\N	6.2	21.0356982	105.8532590
22	20	40	58	01, Phố Hàng Bún, Quận Ba Đình, Hà Nội	25600.00	105000.00	completed	2025-01-03 00:59:24.13421	2025-01-03 01:12:24.13421	\N	4.9	21.0444482	105.8461178
23	16	34	43	1, Phùng Chí Kiên	46000.00	95000.00	completed	2024-12-29 03:05:24.13421	2024-12-29 03:18:24.13421	\N	10.0	21.0446359	105.8027367
24	18	39	48	73, Đường Nguyễn Chí Thanh	31200.00	60000.00	completed	2024-12-29 23:00:24.13421	2024-12-29 23:10:24.13421	\N	6.3	21.0239040	105.8107222
25	6	40	42	10, Phố Lý Quốc Sư	24400.00	15000.00	completed	2025-01-02 02:35:24.13421	2025-01-02 03:08:24.13421	\N	4.6	21.0304724	105.8488474
28	3	39	46	8, Phố Lê Thái Tổ, Hoàn Kiếm, Hà Nội	14000.00	105000.00	completed	2025-01-01 22:56:24.13421	2025-01-01 23:39:24.13421	\N	1.4	21.0309175	105.8507371
26	1	40	48	3B, Phố Lê Thái Tổ, Hoàn Kiếm, Hà Nội	25600.00	30000.00	completed	2025-01-01 14:02:24.13421	2025-01-01 14:10:24.13421	\N	4.9	21.0320076	105.8512129
65	13	30	57	94, Mã Mây	24400.00	105000.00	completed	2024-12-27 14:22:24.13421	2024-12-27 14:31:24.13421	\N	4.6	21.0342414	105.8533178
66	9	34	45	23, Phố Hàng Vôi, Hoan Kiem, Ha Noi	30400.00	110000.00	completed	2025-01-03 03:44:24.13421	2025-01-03 04:11:24.13421	\N	6.1	21.0298462	105.8566846
67	10	29	46	90, Phố Nguyễn Hữu Huân, Hà Nội	34000.00	110000.00	completed	2025-01-03 06:30:24.13421	2025-01-03 07:23:24.13421	\N	7.0	21.0324639	105.8544065
29	19	27	45	109, Mã Mây, Hà Nội	32000.00	220000.00	completed	2025-01-03 01:07:24.13421	2025-01-03 01:55:24.13421	\N	6.5	21.0339948	105.8535544
30	13	34	53	22, Phố Hàng Bè, Hà Nội	30400.00	45000.00	completed	2024-12-28 14:39:24.13421	2024-12-28 15:06:24.13421	\N	6.1	21.0333592	105.8537508
31	19	25	59	32, Phố Hàng Bè, Hà Nội	14800.00	15000.00	completed	2025-01-02 20:42:24.13421	2025-01-02 21:03:24.13421	\N	2.2	21.0331185	105.8537687
32	19	33	55	106, Mã Mây, Hà Nội	16800.00	30000.00	completed	2024-12-30 15:11:24.13421	2024-12-30 15:19:24.13421	\N	2.7	21.0340122	105.8532958
34	10	37	43	68, Mã Mây, Hà Nội	14000.00	80000.00	completed	2024-12-28 13:09:24.13421	2024-12-28 14:01:24.13421	\N	1.7	21.0347247	105.8533643
36	11	31	48	8, Hàng Bạc, Hà Nội	14000.00	135000.00	completed	2025-01-03 14:11:24.13421	2025-01-03 14:34:24.13421	\N	0.3	21.0338753	105.8536358
37	20	36	42	99, Mã Mây, Hà Nội	16000.00	100000.00	completed	2024-12-30 15:59:24.13421	2024-12-30 16:46:24.13421	\N	2.5	21.0341376	105.8535652
38	12	24	51	7, Phố Hàng Dầu, Hà Nội	14000.00	40000.00	completed	2025-01-01 11:27:24.13421	2025-01-01 12:05:24.13421	\N	1.0	21.0319667	105.8540409
39	8	27	57	12, Phố Cầu Gỗ, Hà Nội	28000.00	95000.00	completed	2025-01-02 21:38:24.13421	2025-01-02 21:52:24.13421	\N	5.5	21.0323049	105.8534066
40	14	36	47	90, Phố Cầu Gỗ, Hà Nội	17200.00	25000.00	completed	2025-01-03 00:46:24.13421	2025-01-03 01:14:24.13421	\N	2.8	21.0323606	105.8520868
41	7	27	50	38, Phố Lò Sũ, Hà Nội	32800.00	90000.00	completed	2024-12-29 10:13:24.13421	2024-12-29 10:41:24.13421	\N	6.7	21.0314953	105.8549091
42	18	37	58	95, Hoàng Quốc Việt	27600.00	20000.00	completed	2025-01-03 06:52:24.13421	2025-01-03 07:01:24.13421	\N	5.4	21.0460387	105.8009777
43	14	25	58	20, Lò Sũ, Hà Nội	15200.00	165000.00	completed	2024-12-27 20:03:24.13421	2024-12-27 20:53:24.13421	\N	2.3	21.0314436	105.8552453
44	15	24	54	26A, Trần Hưng Đạo	15200.00	185000.00	completed	2024-12-31 22:18:24.13421	2024-12-31 23:12:24.13421	\N	2.3	21.0200182	105.8562112
45	5	36	52	83B, Ly Thuong Kiet Street	16800.00	45000.00	completed	2025-01-01 04:43:24.13421	2025-01-01 05:29:24.13421	\N	2.7	21.0254070	105.8437140
46	3	38	56	2, Phố Hàng Bông	35600.00	50000.00	completed	2024-12-29 21:21:24.13421	2024-12-29 21:44:24.13421	\N	7.4	21.0313388	105.8489482
48	19	25	58	35, Phố Hàng Bông	14000.00	265000.00	completed	2024-12-31 15:03:24.13421	2024-12-31 15:22:24.13421	\N	1.7	21.0307067	105.8482851
49	7	29	42	38, Đường Thành	25600.00	135000.00	completed	2024-12-30 13:18:24.13421	2024-12-30 13:29:24.13421	\N	4.9	21.0307814	105.8472039
50	18	21	48	46, Phố Lý Thường Kiệt	14000.00	130000.00	completed	2024-12-31 15:32:24.13421	2024-12-31 16:27:24.13421	\N	1.4	21.0242859	105.8476001
51	15	39	46	36, Lý Thường Kiệt	14000.00	185000.00	completed	2025-01-01 01:56:24.13421	2025-01-01 02:56:24.13421	\N	1.1	21.0231794	105.8516744
52	19	40	55	29, Phố Phủ Doãn, Hà Nội	23600.00	20000.00	completed	2024-12-27 15:58:24.13421	2024-12-27 16:35:24.13421	\N	4.4	21.0294692	105.8479138
53	17	39	60	8a, Phố Hàng Tre	14000.00	180000.00	completed	2024-12-29 09:35:24.13421	2024-12-29 10:18:24.13421	\N	1.1	21.0336059	105.8548258
54	17	27	45	33, Phố Phủ Doãn	24800.00	180000.00	completed	2024-12-29 14:43:24.13421	2024-12-29 15:09:24.13421	\N	4.7	21.0293607	105.8478856
55	1	37	58	59, Đường Thành, Hà Nội	14000.00	30000.00	completed	2024-12-31 13:01:24.13421	2024-12-31 13:42:24.13421	\N	1.9	21.0311286	105.8472821
56	15	27	59	27, Phố Phủ Doãn, Hà Nội	25200.00	135000.00	completed	2024-12-28 00:39:24.13421	2024-12-28 00:49:24.13421	\N	4.8	21.0295460	105.8479124
58	11	21	42	21a, Bát Đàn, Hà Nội	14000.00	45000.00	completed	2025-01-02 15:55:24.13421	2025-01-02 16:20:24.13421	\N	0.1	21.0336742	105.8475063
59	17	35	47	26, Lý Thường Kiệt	21200.00	50000.00	completed	2024-12-30 18:02:24.13421	2024-12-30 18:22:24.13421	\N	3.8	21.0225905	105.8535856
60	16	30	56	77, Đường Thành	28800.00	70000.00	completed	2025-01-04 01:24:24.13421	2025-01-04 01:54:24.13421	\N	5.7	21.0307123	105.8474583
61	2	35	56	24, Phố Tông Đản, Hoàn Kiếm, Hà Nội	20000.00	50000.00	completed	2025-01-01 03:22:24.13421	2025-01-01 04:21:24.13421	\N	3.5	21.0255087	105.8579872
62	7	31	44	18b, Phố Tông Đản	14000.00	50000.00	completed	2025-01-01 07:13:24.13421	2025-01-01 08:10:24.13421	\N	1.2	21.0268165	105.8575022
64	18	36	50	58, Hàng Bè, Hà Nội	17600.00	20000.00	completed	2024-12-31 21:37:24.13421	2024-12-31 21:47:24.13421	\N	2.9	21.0324325	105.8537078
1	15	30	47	34, Hàng Giấy	22800.00	125000.00	completed	2024-12-31 20:36:24.13421	2024-12-31 21:07:24.13421	\N	4.2	21.0390983	105.8480778
68	8	25	59	49, Hàng Bè, Hà Nội	14400.00	20000.00	completed	2024-12-30 06:28:24.13421	2024-12-30 06:54:24.13421	\N	2.1	21.0327409	105.8539635
69	12	28	54	65, Phố Cầu Gỗ	28400.00	240000.00	completed	2025-01-01 18:02:24.13421	2025-01-01 18:56:24.13421	\N	5.6	21.0321684	105.8523953
70	15	39	55	18, Hàng Quạt	14000.00	30000.00	completed	2024-12-29 10:56:24.13421	2024-12-29 11:40:24.13421	\N	1.8	21.0329639	105.8498165
71	3	21	51	24, Ngõ Hà Trung	14000.00	70000.00	completed	2024-12-27 19:39:24.13421	2024-12-27 20:36:24.13421	\N	1.1	21.0304439	105.8458967
72	9	34	53	1a, Lê Duẩn	29600.00	45000.00	completed	2025-01-01 05:51:24.13421	2025-01-01 06:40:24.13421	\N	5.9	21.0296792	105.8417547
75	8	32	50	32, Phố Văn Miếu, Đống Đa, Hà Nội	26000.00	60000.00	completed	2024-12-30 06:36:24.13421	2024-12-30 07:07:24.13421	\N	5.0	21.0285199	105.8364926
94	6	25	56	51, Phố Lạc Trung, Hai Bà Trưng	19200.00	120000.00	completed	2025-01-03 22:03:24.13421	2025-01-03 23:00:24.13421	\N	3.3	21.0028575	105.8663524
95	4	40	55	1, Phố Phương Mai, Đống Đa	18800.00	205000.00	completed	2025-01-01 06:56:24.13421	2025-01-01 07:45:24.13421	\N	3.2	21.0040457	105.8402130
96	13	39	43	18T2, 2 Lê Văn Lương, Thanh Xuân	35600.00	20000.00	completed	2024-12-29 17:00:24.13421	2024-12-29 17:00:24.13421	\N	7.4	21.0064773	105.8055281
97	4	33	41	24T2, 2 Hoàng Đạo Thúy, Cầu Giấy	36800.00	70000.00	completed	2025-01-02 22:57:24.13421	2025-01-02 23:14:24.13421	\N	7.7	21.0075785	105.8029991
98	2	26	45	8, Phố Phạm Ngọc Thạch, Đống Đa	24000.00	10000.00	completed	2024-12-29 08:30:24.13421	2024-12-29 08:43:24.13421	\N	4.5	21.0075873	105.8334660
99	3	34	56	222, Trần Duy Hưng, Cầu Giấy	50400.00	145000.00	completed	2024-12-31 04:12:24.13421	2024-12-31 04:37:24.13421	\N	11.1	21.0081293	105.7934073
107	213	212	\N	\N	\N	\N	cart	\N	\N	\N	\N	\N	\N
105	211	212	54	Ngõ 72 Tôn Thất Tùng, Phường Khương Thượng, Quận Đống Đa, Thành phố Hà Nội, 10306, Việt Nam	22000.00	130000.00	preparing	2025-01-15 16:19:25.630132	\N	\N	4.0	21.0017791	105.8283190
104	211	212	48	182 Lương Thế Vinh	20000.00	135000.00	cancelled	2025-01-15 13:25:05.786243	\N	Thêm rau	\N	\N	\N
103	211	212	57	336 Nguyễn Trãi	20000.00	105000.00	completed	2025-01-15 12:42:21.160307	2025-01-15 12:52:18.900889	Sốp không cho hành giúp em ạ	\N	\N	\N
106	211	212	35	Ngõ 72 Tôn Thất Tùng, Phường Khương Thượng, Quận Đống Đa, Thành phố Hà Nội, 10306, Việt Nam	25600.00	110000.00	completed	2025-01-17 22:31:28.517103	\N	\N	4.9	21.0017791	105.8283190
108	211	212	59	Bệnh viện Đại học Quốc gia Hà Nội, 182, Đường Lương Thế Vinh, Phường Trung Văn, Quận Nam Từ Liêm, Thành phố Hà Nội, 12011, Việt Nam	14000.00	110000.00	completed	2025-01-18 05:32:48.557011	2025-01-18 06:23:18.203025	\N	1.8	20.9908736	105.7965721
111	211	215	41	Trường Đại học Khoa học Tự nhiên, 334, Đường Nguyễn Trãi, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội, 10165, Việt Nam	20000.00	190000.00	completed	2025-01-18 14:08:29.794002	2025-01-18 14:14:58.626078	Nhiều hành nhiều ớt vì cuộc đời này bao nhiêu vị cay cũng không đủ	3.5	20.9959221	105.8079524
112	211	65	\N	\N	\N	\N	cart	\N	\N	\N	\N	\N	\N
109	211	212	44	Trường Đại học Khoa học Tự nhiên, 334, Đường Nguyễn Trãi, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội, 10165, Việt Nam	14000.00	110000.00	completed	2025-01-18 09:17:07.635252	2025-01-18 11:41:24.331877	Nhiều hành nhiều ớt vì cuộc đời này bao nhiêu vị cay cũng không đủ	0.0	20.9959221	105.8079524
113	211	25	50	Trường Đại học Khoa học Tự nhiên, 334, Đường Nguyễn Trãi, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội, 10165, Việt Nam	30400.00	45000.00	completed	2025-01-18 15:00:12.323584	2025-01-18 15:04:53.003342	không hành	6.1	20.9959221	105.8079524
110	211	22	42	Bệnh viện Đại học Quốc gia Hà Nội, 182, Đường Lương Thế Vinh, Phường Trung Văn, Quận Nam Từ Liêm, Thành phố Hà Nội, 12011, Việt Nam	42000.00	25000.00	completed	2025-01-18 12:42:11.920794	2025-01-18 12:52:58.456638	\N	9.0	20.9908736	105.7965721
\.


--
-- Data for Name: res_dri_chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.res_dri_chats (chat_id, restaurant_id, driver_id, created_at) FROM stdin;
\.


--
-- Data for Name: res_dri_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.res_dri_messages (message_id, chat_id, sender_id, message, created_at) FROM stdin;
\.


--
-- Data for Name: restaurant_times; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurant_times (restaurant_id, day, open_time, close_time) FROM stdin;
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurants (restaurant_id, name, category, address, status, is_deleted, x, y) FROM stdin;
22	Nhà Hàng Blue Butterfly	Gà rán - Burger	69, Mã Mây, Hoan Kiem, Hà Nội	active	f	21.0347487	105.8535038
24	Chả Cá Cà Cuống	Tráng miệng	17, Phố Chả Cá, Hoan Kiem, Hanoi	active	f	21.0356006	105.8492956
25	Cơm Cường	Đồ chay	14, Nguyễn Bỉnh Khiêm	active	f	21.0174867	105.8484165
26	Pizza Hut	Pizza - Mì Ý	409, Kim Mã, Quận Ba Đình, Hà Nội	active	f	21.0303431	105.8159146
27	Izakaya Yancha	Gà rán - Burger	579, Phố Kim Mã, Quận Ba Đình, Hà Nội	active	f	21.0294166	105.8090898
28	Kitaguni	Lẩu - Nướng	639, Phố Kim Mã, Quận Ba Đình, Hà Nội	active	f	21.0292029	105.8074289
29	Ofukuro	Bánh Việt Nam	Phố Kim Mã, Quận Ba Đình, Hà Nội	active	f	21.0285111	105.8062080
30	True Viet	Lẩu - Nướng	156, Đường Âu Cơ, Hanoi	active	f	21.0645792	105.8313838
31	Phở Cường	Lẩu - Nướng	23, Phố Hàng Muối, Hà Nội	active	f	21.0339341	105.8548223
32	Nhà Hàng La Bicicleta - Barcelona Bistro	Đồ chay	44, Xuan Dieu Ngo 31, Tay Ho, Hanoi	active	f	21.0613890	105.8273413
34	Nhà Hàng Da Paolo Westlake	Lẩu - Nướng	18, Dang Thai Mai, Hanoi	active	f	21.0551789	105.8213600
35	Nhà Hàng Foodshop 45	Bánh Việt Nam	59, Phố Trúc Bạch	active	f	21.0479061	105.8414891
36	Quán Cơm Mậu Dịch	Trà sữa	37, Phố Nam Tràng, Quận Ba Đình, Hà Nội	active	f	21.0455452	105.8405476
37	Quan An Ngon	Tráng miệng	34, Phố Phan Đình Phùng, Hanoi	active	f	21.0406918	105.8425141
38	Lẩu Gà Ó O - Chicken Hotpot	Trà sữa	118, Phố Ngụy Như Kon Tum, Thanh Xuân, Hà Nội	active	f	21.0014898	105.8042979
39	Nhà Hàng Moto-san	Trà sữa	4, Lý Đạo Thành, Hoàn Kiếm, Hà Nội	active	f	21.0254125	105.8577493
40	Quán Thị Mẹt	Tráng miệng	26, Phố Mai Anh Tuấn, Đống Đa, Hà Nội	active	f	21.0185659	105.8230246
41	Nhà hàng Yumi	Pizza - Mì Ý	số 24 BT1 khu đô thị mới Mễ Trì hạ, nam Từ Liêm, Hà Nội, Mễ Trì, Nam Từ Liêm, Hà Nội	active	f	21.0151072	105.7814958
42	Nhà Hàng Bò Đội Nón	Trà sữa	60, Trần Đăng Ninh, Cầu Giấy, Hà Nội	active	f	21.0367552	105.7941995
43	Nhà Hàng Bún Việt	Ăn vặt	111, Phõ Láng Hạ, Đống Đa, Hà Nội	active	f	21.0117249	105.8119169
44	Nhà Hàng GoldMalt Sài Đồng	Tráng miệng	13, No1A, Long Biên, Hà Nội	active	f	21.0387571	105.9044083
45	Pizza Hut Tôn Đức Thắng	Trà sữa	138, Phố Tôn Đức Thắng, Đống Đa, Hà Nội	active	f	21.0258945	105.8334587
47	Pizza Hut	Đồ chay	222, Trần Duy Hưng, Cầu Giấy, Hà Nội	active	f	21.0072356	105.7930282
48	Pizza Hut	Gà rán - Burger	191, Phố Bà Triệu, Hai Bà Trưng, Hà Nội	active	f	21.0113910	105.8492805
49	Pizza Hut	Hải sản	Đường Nguyễn Văn Linh, Long Biên, Hà Nội	active	f	21.0504678	105.8932462
50	Pizza Hut	Trà sữa	146, Phố Trung Hoà, Cầu Giấy, Hà Nội	active	f	21.0171583	105.7991440
51	Pizza Hut Phan Chu Trinh	Hải sản	32B, Phố Phan Chu Trinh, Phố Phan Huy Chú, Hà Nội	active	f	21.0188607	105.8552418
52	Nhà Hàng A La Folie	Tráng miệng	63 Ngõ Huế, Ngô Thì Nhậm, Hai Bà Trưng, Hà Nội, Vietnam	active	f	21.0146587	105.8522123
53	Bún Chẳ Đắc Kim	Tráng miệng	67, Đường Thành	active	f	21.0310565	105.8472795
54	Chops	Pizza - Mì Ý	4, Phố Quảng An, Tây Hồ, Hà Nội	active	f	21.0625869	105.8291428
55	Rue Lamblot	Ăn vặt	6, Phố Lý Quốc Sư	active	f	21.0306212	105.8487741
56	Pho Thin	Hải sản	13, Phố Lò Đúc	active	f	21.0170351	105.8559963
57	Nhà Hàng Lotus Blanc	Cơm	2, Phố Chân Cầm	active	f	21.0306071	105.8487452
58	Khách Sạn Haneul	Tráng miệng	11a, Thể Giao, Hai Bà trưng, Ha Noi	active	f	21.0140828	105.8479487
59	Xoi Yen	Pizza - Mì Ý	35, Phố Nguyễn Hữu Huân	active	f	21.0337675	105.8545363
60	Cửa Hàng Bia Hơi Hà Nội	Bánh Mì - Xôi	Bát Đàn	active	f	21.0336801	105.8462281
62	Nun Changed Dac Kim-분짜	Cơm	1, Phố Hàng Mành	active	f	21.0322599	105.8482188
64	Cửa Hàng Bún Chả Hương Liên	Ăn vặt	24, Phố Lê Văn Hưu, Hai Bà Trưng, Hà Nội	active	f	21.0180504	105.8538843
65	OiShi Ngon	Bún - Phở - Cháo	153, Phố Tây Sơn, Đống Đa, Ha Noi	active	f	21.0109329	105.8254405
68	Noodle & Roll	Lẩu - Nướng	39C, Phố Lý Quốc Sư	active	f	21.0297478	105.8492754
69	Little Hanoi	Gà rán - Burger	16, Phố Hàng Bè	active	f	21.0334623	105.8537432
71	Zenith Yoga Studio II & Café	Bún - Phở - Cháo	62, Phố Lý Thường Kiệt	active	f	21.0252545	105.8444379
72	Paolo & Chi Pizzeria Old Quarter	Bánh Việt Nam	48, Hàng Buồm, Hoàn Kiếm, Hà Nội	active	f	21.0360908	105.8521843
74	Bánh Mỳ Doner Kebab Dũng Béo	Đồ chay	ngõ 50, Đường Nguyễn Chí Thanh	active	f	21.0249892	105.8110309
75	Steakout	Gà rán - Burger	24, Phố Trần Hưng Đạo	active	f	21.0198460	105.8566061
79	Miến Lươn Đông Thịnh	Bún - Phở - Cháo	87, Phố Hàng Điếu	active	f	21.0318532	105.8469051
80	El Gaucho	Bún - Phở - Cháo	11, Phố Tràng Tiền, Hoàn Kiếm, Hà Nội	active	f	21.0244842	105.8563607
82	Cà Phê Fast food	Gà rán - Burger	Mã Mây	active	f	21.0349913	105.8533701
83	Nhà Hàng Chay Aumee	Gà rán - Burger	26, Phố Châu Long	active	f	21.0460210	105.8425961
85	Nhà Hàng Hanoi Mix	Cà phê	81, Đường Xuân Diệu	active	f	21.0676753	105.8260740
86	Nhà Hàng Hưng Phát	Bún - Phở - Cháo	7, Đường Điện Biên Phủ	active	f	21.0293208	105.8421665
88	Cơm Chay Sala Quán	Bún - Phở - Cháo	170, Ngọc Hà	active	f	21.0383505	105.8290578
89	Hương Việt	Ăn vặt	13, Phố Hàng Cá	active	f	21.0360635	105.8488756
90	Nhà hàng Vua Tôm Hùm	Bánh Việt Nam	Nguyễn Khánh Toàn	active	f	21.0386723	105.8000055
91	Lẩu Mắm Bà Sáu	Bánh Mì - Xôi	41, Văn Cao	active	f	21.0409443	105.8164024
92	Sixty Six	Đồ chay	Phố Hàng Bồ	active	f	21.0339229	105.8486581
93	Bia Bắc Sơn	Bún - Phở - Cháo	Quận Ba Đình, Hà Nội	active	f	21.0383920	105.8311299
94	Bách Phương - Bún Bò Nam Bộ	Trà sữa	73, Phố Hàng Điếu, Hoàn Kiếm, Hà Nội	active	f	21.0322448	105.8467823
95	Cửa Hàng Bún Chả Hương Liên	Lẩu - Nướng	38, Hàng Buồm	active	f	21.0359942	105.8518120
97	Nhà Hàng Heritage	Hải sản	19, Đường Hoàng Diệu, Hà Nội	active	f	21.0331145	105.8391403
98	Quán Gà 36	Cà phê	Lạc Long Quân	active	f	21.0643229	105.8094102
101	Bồ Đề Quán	Bánh Mì - Xôi	168, Đường Âu Cơ	active	f	21.0646787	105.8311873
102	Street Sushi	Pizza - Mì Ý	40, Phố Phan Kế Bính, Quận Ba Đình, Hà Nội	active	f	21.0348271	105.8109560
105	Nhà Hàng Maison de Têt décor	Tráng miệng	36, 21°03′26.89″N 105°49′56.29″E	active	f	21.0574445	105.8323977
106	Bún Chả TA	Lẩu - Nướng	21, Phố Nguyễn Hữu Huân	active	f	21.0343571	105.8544931
107	Nhà Hàng ABC	Trà sữa	53A, Hang Bai	active	f	21.0216040	105.8524885
109	Nhà Hàng Ấn Độ Namaste Hanoi	Đồ chay	46, Phố Thợ Nhuộm	active	f	21.0260964	105.8452285
110	Nhà Hàng Gelato Italia	Hải sản	31, To Ngoc Van	active	f	21.0684973	105.8243663
111	Ẩm Thực Sành Ăn	Cà phê	78, Đường Trần Nhật Duật	active	f	21.0375600	105.8526198
112	Nhà Hàng Dim Sum Corner	Bún - Phở - Cháo	182, Phố Hàng Bông	active	f	21.0289385	105.8444224
118	Nhà Hàng Nét Huế	Trà sữa	198, Phố Hàng Bông	active	f	21.0287186	105.8439963
119	The Kneipe	Cơm	52, Ngõ 52 Đường Tô Ngọc Vân	active	f	21.0688402	105.8242826
122	Nhà Hàng New York Sports Bar	Bánh Việt Nam	38, Phố Bà Triệu, Hoàn Kiếm, Hà Nội	active	f	21.0236407	105.8508563
123	Nhà Hàng Kiếu Gia	Bánh Mì - Xôi	46, Chương Đương Độ, Hoàn Kiếm, Hà Nội	active	f	21.0294905	105.8616142
124	Pizza 4P's	Bánh Mì - Xôi	43, Phố Tràng Tiền, Hoàn Kiếm, Hà Nội	active	f	21.0249719	105.8543529
125	Nhà Hàng Jalus Vegan	Cơm	46, Phố Hàng Trống	active	f	21.0306344	105.8495042
126	Tung's Kitchen	Lẩu - Nướng	2, Phố Hàng Bông, Hoàn Kiếm, Hà Nội	active	f	21.0313543	105.8489788
127	Ngu Vi Quán	Bánh Việt Nam	5, Hồng Phúc	active	f	21.0415982	105.8481391
128	quang minh	Hải sản	2c, Phố Quang Trung	active	f	21.0267787	105.8501521
129	Miến & Bánh Đa Cua Lý Quốc Sư	Cà phê	6A, Phùng Hưng	active	f	21.0390535	105.8465857
130	S&L's Diner	Tráng miệng	22, Bảo Khánh	active	f	21.0301366	105.8504582
132	Nhà Hàng High Way 4	Bún - Phở - Cháo	5, Phố Hàng Tre	active	f	21.0336298	105.8549965
134	Nhà Hàng Ahimsa	Bánh Mì - Xôi	84, Đường Điện Biên Phủ	active	f	21.0296651	105.8422981
138	Cửa Hàng Hoàng Tâm Xôi	Gà rán - Burger	Phố Hàng Đậu	active	f	21.0402766	105.8481886
141	Phở Gia truyền Bát Đàn	Tráng miệng	49, Bát Đàn, Hoàn Kiếm, Hà Nội	active	f	21.0336377	105.8463792
142	Nha hang Cha Ca La Vong	Trà sữa	107, Phố Nguyễn Trường Tộ	active	f	21.0430151	105.8437843
143	Nhà Hàng Ẩm Thực Ba Miền	Hải sản	Tạ Hiện	active	f	21.0353161	105.8520421
144	Phở bò 21	Pizza - Mì Ý	21, Phố Nguyễn Đình Chiểu	active	f	21.0158745	105.8474793
145	Dong Phu	Cơm	12, Hàng Điếu, Cửa Đông, Hoàn Kiếm, Hà Nội, Vietnam	active	f	21.0335640	105.8470901
148	Bún Chả - Nem Cua Bê	Cà phê	23, Phố Bát Sứ	active	f	21.0349731	105.8475555
149	Nhà Hàng Chay Mihn	Bún - Phở - Cháo	09, Phố Ấu Triệu	active	f	21.0284211	105.8483461
151	Pho Ga	Cà phê	Phố Nguyễn Trường Tộ	active	f	21.0422036	105.8453469
153	Phở Mai Anh	Bánh Mì - Xôi	32, Phố Lê Văn Hưu	active	f	21.0180097	105.8537362
154	Cửa Hàng Chả Cá Anh Vũ	Lẩu - Nướng	116K1, Giảng Võ	active	f	21.0270241	105.8242231
157	Tam An Lac	Ăn vặt	Phố Lý Thường Kiệt	active	f	21.0256891	105.8440968
158	Quan 66	Hải sản	65b, Hàng Bút	active	f	21.0348862	105.8481260
159	Phở Tư Lùn	Đồ chay	23C Hai Bà Trưng	active	f	21.0239610	105.8537870
160	Tư Lùn - Phở Gà & Bún Thang	Bún - Phở - Cháo	5, Phố Hàng Trống	active	f	21.0311779	105.8493001
162	Cửa Hàng Bánh Mì Cười - Nam Đồng	Bánh Mì - Xôi	103, Nam Đồng	active	f	21.0135702	105.8330632
163	Bún Ngan Bích Béo	Cơm	16, Phố Hàng Cân	active	f	21.0349558	105.8494930
165	Bánh Đúc Nóng - Trung Tự	Lẩu - Nướng	116-C2	active	f	21.0088422	105.8337750
166	Nhà Hàng Bánh Trắng Hoàng Bèo	Bún - Phở - Cháo	247, Đường Nguyễn Ngọc Vũ, Cầu Giấy, Hà Nội	active	f	21.0145591	105.8048657
167	Patisserie Lapin	Pizza - Mì Ý	25, Trần Duy Hưng, Cầu Giấy, Hà Nội	active	f	21.0139948	105.8036897
169	Nhà hàng an viên	Ăn vặt	127, Chùa Láng, Đống Đa, Hà Nội	active	f	21.0234453	105.8042728
172	VNUA restaurant	Đồ chay	NA, Đường S, Gia Lâm, Hà Nội	active	f	21.0065578	105.9332118
174	San hô biển	Cơm	122, Phố Trung Hoà, Cầu Giấy, Hà Nội	active	f	21.0166700	105.7996998
176	Nha Hang Nhat Nuong	Bánh Mì - Xôi	90, Trần Vỹ, Cầu Giấy, Hà Nội	active	f	21.0395544	105.7727340
147	Nhà Hàng Gòn - Bites & Veggies	Bánh Việt Nam	156, Phố Từ Hoa	inactive	f	21.0597181	105.8300842
66	Ưu Đàm Chay	Ăn vặt	34, Hàng Bài	inactive	f	21.0225600	105.8524620
2	Nhà Hàng Little Hanoi	Bánh Mì - Xôi	21, Phố Hàng Gai	active	f	21.0321895	105.8509370
3	Nhà Hàng New Day	Gà rán - Burger	72, Mã Mây	active	f	21.0346545	105.8533590
4	Quán Ăn Ngon - Phan Bội Châu	Lẩu - Nướng	18, Phố Phan Bội Châu	active	f	21.0262611	105.8434161
5	Sushi Hokkaido Sachi	Hải sản	33, Phố Trần Hưng Đạo, Hoàn Kiếm, Hà Nội	active	f	21.0202197	105.8543053
10	Thai Village	Pizza - Mì Ý	3B, Phố Lê Thái Tổ, Hoàn Kiếm, Hà Nội	active	f	21.0320076	105.8512129
11	Nhà Hàng Ba Ba	Lẩu - Nướng	95, Hoàng Quốc Việt	active	f	21.0460387	105.8009777
12	Toshi Fusion	Tráng miệng	26A, Trần Hưng Đạo	active	f	21.0200182	105.8562112
13	Nhà Hàng Duy Lê Malraux	Tráng miệng	2, Phố Hàng Bông	active	f	21.0313388	105.8489482
14	Son Thanh	Tráng miệng	38, Đường Thành	active	f	21.0307814	105.8472039
16	Red bean	Đồ chay	94, Mã Mây	active	f	21.0342414	105.8533178
17	Nhà Hàng Green Mango	Đồ chay	18, Hàng Quạt	active	f	21.0329639	105.8498165
1	Nha Hang Indochine	Bún - Phở - Cháo	Nam Ngư	inactive	f	21.0265868	105.8430053
6	Tandoor Indian Cuisine	Ăn vặt	Phố Hàng Bè	inactive	f	21.0335791	105.8537345
7	Nhà Hàng Âu Lạc Brazil II	Ăn vặt	6a, Phố Cao Bá Quát	inactive	f	21.0298564	105.8409205
15	Nhà Hàng Yakiniku Shiki	Bún - Phở - Cháo	8a, Phố Hàng Tre	inactive	f	21.0336059	105.8548258
21	Nhà Hàng Gecko	Cơm	Phố Hàng Bồ	inactive	f	21.0337414	105.8481224
33	Nhà Hàng Wa Japanese Cuisine	Trà sữa	7, Phố Trúc Bạch, Quận Ba Đình, Hanoi	inactive	f	21.0493340	105.8393180
9	Pho 10	Gà rán - Burger	10, Phố Lý Quốc Sư	inactive	f	21.0304724	105.8488474
46	Pizza Hut	Pizza - Mì Ý	72A, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội	inactive	f	21.0031239	105.8166610
18	Nhà Hàng Chả Cá Văn Miếu	Cà phê	9, Phố Văn Miếu, Đống Đa, Hà Nội	active	f	21.0296628	105.8369362
20	Nhà Hàng Highway 4	Gà rán - Burger	575, Ngõ 575 Kim Mã, Quận Ba Đình, Hà Nội	active	f	21.0294390	105.8092811
81	Porte D' Annam	Hải sản	22, Phố Nhà Thờ	inactive	f	21.0290469	105.8496780
99	Lẩu Dê Nhất Ly	Bánh Việt Nam	15a Hàng cót, Hàng Cót	inactive	f	21.0376339	105.8472101
104	Nhà Hàng Bên Trăng	Trà sữa	80/78, Phố Bắc Cầu	inactive	f	21.0680880	105.8594528
108	Nhà Hàng Hồng Hoài	Đồ chay	20, Phố Bát Đàn	inactive	f	21.0337915	105.8474622
61	Nhà Hàng Gia Ngu	Bánh Việt Nam	Gia Ngư	inactive	f	21.0331038	105.8525285
63	The Hung Snake Rétaurant	Bánh Mì - Xôi	33, Le Mat - Việt Hung - Long Biến - Hanoi	inactive	f	21.0560448	105.8982143
67	Oh bread	Pizza - Mì Ý	21, Hàng Bè	inactive	f	21.0333758	105.8539085
70	Nhà Hàng Banana Tree	Cơm	62, Đào Duy Từ	inactive	f	21.0350560	105.8531396
73	Nhà Hàng Foodshop 45 - Indian Cuisine	Bún - Phở - Cháo	32, Hàng Buồm	inactive	f	21.0360158	105.8518953
76	Nhà Hàng & Cà Phê EMM's	Pizza - Mì Ý	110 D1, Trần Huy Liệu, Quận Ba Đình, Ha Noi	inactive	f	21.0270627	105.8223488
77	Pho Vui	Bánh Mì - Xôi	25, Hàng Buồm	inactive	f	21.0351630	105.8512274
78	Nhà Hàng Luna D' Autunno	Bánh Mì - Xôi	27, Nam Ngư	inactive	f	21.0264034	105.8426880
84	Chay Aummee	Bánh Việt Nam	26, Phố Châu Long, Ba Đình, Hà Nội	inactive	f	21.0457483	105.8425594
87	Son Duong Quan	Gà rán - Burger	23, Phố Hàng Tre	inactive	f	21.0320782	105.8555601
96	Nhà Hàng India Palace	Bánh Việt Nam	Quảng An	inactive	f	21.0625504	105.8291192
100	Thanh Hop restaurant	Trà sữa	12, Đinh Liệt	inactive	f	21.0331243	105.8519038
103	Pho Ganh Dam Trau	Bánh Mì - Xôi	Luong Yen	inactive	f	21.0121983	105.8644138
114	quán góc hà nội	Pizza - Mì Ý	47, Phố Đinh Tiên Hoàng	inactive	f	21.0307904	105.8536866
115	Cửa Hàng Bít Tết 53 Cô Mẫu	Hải sản	53b, Hàng Bài	inactive	f	21.0202980	105.8518305
117	Kem Xôi Thu Nga	Gà rán - Burger	8, Phan Chu Trinh	inactive	f	21.0233472	105.8565399
113	trà đào 42	Tráng miệng	42k, Phố Lý Thường Kiệt	inactive	f	21.0237658	105.8498761
116	Nhà Hàng L'amore	Gà rán - Burger	42, Lương Văn Can	inactive	f	21.0328009	105.8503828
120	Minh Minh Quán	Bánh Việt Nam	37/42, Phố Sài Đồng	inactive	f	21.0336376	105.9100447
121	Cửa Hàng Bia Minh	Cơm	7a, Đinh Liệt	inactive	f	21.0329231	105.8518481
131	Nhà Hàng Al Fresco's	Bún - Phở - Cháo	23L, Hai Ba Trung	inactive	f	21.0288652	105.8497803
133	Cơm Chay Nàng Tấm	Cà phê	79A, Phố Trần Hưng Đạo	inactive	f	21.0223434	105.8469426
152	Loving Hut	Ăn vặt	192, Quán Thánh	inactive	f	21.0423221	105.8380982
156	Cửa Hàng Mai Nga Bún Cá Hà Thành	Tráng miệng	61A, Phố Lê Văn Hưu	inactive	f	21.0180589	105.8524887
135	Nhà Hàng Chicken Street	Bánh Việt Nam	Lý Văn Phúc	inactive	f	21.0313374	105.8321031
136	Nhà Hàng Guan Nem	Cơm	117, Phố Bùi Thị Xuân	inactive	f	21.0145295	105.8498058
137	Phở Lâm	Bánh Mì - Xôi	7, Nam Ngư	inactive	f	21.0265898	105.8434691
139	Nhà Hàng Bồ Đề Tâm	Cơm	34, Phạm Huy Thông	inactive	f	21.0281060	105.8101165
140	Bánh cuốn Gia An	Cơm	70, Phố Trung Hoà, Cầu Giấy, Hà Nội	inactive	f	21.0152726	105.8011916
146	Bún Mọc	Lẩu - Nướng	57, Hàng Lược	inactive	f	21.0375341	105.8482006
150	Quán Phở Thìn	Ăn vặt	13, Phố Lò Đúc	inactive	f	21.0181784	105.8553000
155	Phở Cuốn Hương Mai	Đồ chay	25, Phố Ngũ Xã	inactive	f	21.0460551	105.8413064
161	Bánh Cuốn Thanh Vân	Cà phê	119, Phố Nguyễn Trường Tộ	inactive	f	21.0435101	105.8419258
164	Nhà Hàng Cháo Trai	Pizza - Mì Ý	26, Trần Xuân Soạn	inactive	f	21.0171688	105.8550764
168	Nhà hàng	Trà sữa	Lê Văn Hiến, Bắc Từ Liêm, Hà Nội	inactive	f	21.0745488	105.7738617
170	Nhà Hàng Cơm Niêu Kombo	Bánh Mì - Xôi	257, Giảng Võ, Đống Đa, Hà Nội	inactive	f	21.0242775	105.8209471
171	T+ Beer Club	Hải sản	174, Ngọc Khánh, Quận Ba Đình, Hà Nội	inactive	f	21.0239192	105.8199492
173	Nhà Hàng Bít Tết Ngon	Bánh Việt Nam	299, Giảng Võ, Đống Đa, Hà Nội	inactive	f	21.0239911	105.8206671
175	Nhà hàng Phương Nam	Trà sữa	69, Chùa Láng, Đống Đa, Hà Nội	inactive	f	21.0229999	105.8061749
185	Bánh Mỳ Cô Long	Cà phê	29, Đường Nguyễn Chí Thanh	inactive	f	21.0287861	105.8128162
186	Nhà Hàng Han Kook Kwan	Bánh Việt Nam	31, Đường Nguyễn Chí Thanh	inactive	f	21.0284982	105.8127598
189	Nhà hàng cô tô	Lẩu - Nướng	116, Phố Trung Kính, Cầu Giấy, Hà Nội	inactive	f	21.0184654	105.7932361
177	Nhà hàng Samwon	Đồ chay	68, Dương Đình Nghệ, Cầu Giấy, Hà Nội	active	f	21.0223566	105.7883168
178	Gà Mạnh Hoạch	Bánh Việt Nam	105 D3, Trần Huy Liệu, Quận Ba Đình, Hà Nội	active	f	21.0271124	105.8222498
179	Nhà hàng Món Huế	Gà rán - Burger	35, Đường Nguyễn Chí Thanh	active	f	21.0269585	105.8122368
180	Nhà Hàng Bia Hơi Hải Xồm	Đồ chay	5, Phan Kế Bính, Quận Ba Đình, Hà Nội	active	f	21.0344004	105.8112640
181	Cửa Hàng Bánh Ngọt Paris Gateaux	Bánh Mì - Xôi	35, Đường Nguyễn Chí Thanh	active	f	21.0274542	105.8123843
183	Đà Nẵng Quán Bánh Tráng	Bánh Mì - Xôi	77, Phố Trung Hoà, Cầu Giấy, Hà Nội	active	f	21.0161503	105.7997636
184	Nhà hàng Cơm niêu Thúy Nga	Đồ chay	110B2, Đường Nguyễn Chí Thanh	active	f	21.0280475	105.8125587
187	Nhà hàng Như Quỳnh	Bún - Phở - Cháo	31, Đường Nguyễn Chí Thanh	active	f	21.0284656	105.8127303
188	Quán bánh xèo Thanh Nga	Pizza - Mì Ý	số 18, Lê Văn Hiến, Bắc Từ Liêm, Hà Nội	active	f	21.0760243	105.7735397
190	Nhà Hàng Bếp Mường	Bánh Việt Nam	8, Phố Nguyễn Công Hoan, Quận Ba Đình, Hà Nội	active	f	21.0271780	105.8171936
191	Vị Quảng	Trà sữa	109, Đường Nguyễn Chí Thanh	active	f	21.0157720	105.8055468
192	Nhà hàng Tadibar	Đồ chay	41, Trần Kim Xuyến, Cầu Giấy, Hà Nội	active	f	21.0191687	105.7935090
193	Nhà Hàng Hàng Bánh Poeme	Gà rán - Burger	110 H1, Láng Hạ, Quận Ba Đình, Hà Nội	active	f	21.0198815	105.8170605
194	Nhà hàng Ngọc Thúy	Hải sản	7, Phố Ngọc Khánh	active	f	21.0301162	105.8172329
195	Nhà hàng 123 Kim Mã	Tráng miệng	365, Kim Mã	active	f	21.0303637	105.8166595
196	Nhà Hàng Kombo	Bánh Việt Nam	30, Nguyễn Phong Sắc, Cầu Giấy, Hà Nội	active	f	21.0385851	105.7906467
197	Nhà hàng Kim Long	Lẩu - Nướng	D8, Trần Huy Liệu	active	f	21.0274431	105.8214833
198	Nhà hàng Mẹt Đồng Quê	Trà sữa	107 A6, Phố Trần Huy Liệu	active	f	21.0304779	105.8198351
199	Bánh Cuốn Gia An	Hải sản	108, Phố Trần Huy Liệu	active	f	21.0303953	105.8196715
182	Nhà hàng Nét Huế	Bánh Mì - Xôi	33, Đường Nguyễn Chí Thanh	inactive	f	21.0278572	105.8125211
200	Nhà Hàng Lẩu Bà Téo	Cơm	Cầu Giấy, Hà Nội	inactive	f	21.0394206	105.7726814
214	Cơ Sở Dữ Liệu Dead	Ăn vặt	Trường Đại học Khoa học Tự nhiên, 334, Đường Nguyễn Trãi, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội, 10165, Việt Nam	inactive	f	20.9959221	105.8079524
19	Nhà Hàng Chả Cá Thủy Hồng	Lẩu - Nướng	12, 12 Hàng Gà, Hoàn Kiếm, Hà Nội, Việt Nam	active	f	21.0361852	105.8469741
215	Wingardium Leviosa	Cà phê	Đường Trường Chinh, Phường Khương Mai, Quận Thanh Xuân, Thành phố Hà Nội, 10181, Việt Nam	inactive	f	20.9995722	105.8324722
8	Nhà Hàng La Badiane	Ăn vặt	10, Nam Ngư	active	t	21.0265884	105.8432573
212	Bún Cá Long Ca 	Bún - Phở - Cháo	Bệnh viện Đại học Quốc gia Hà Nội, 182, Đường Lương Thế Vinh, Phường Trung Văn, Quận Nam Từ Liêm, Thành phố Hà Nội, 12011, Việt Nam	inactive	f	20.9908736	105.7965721
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, user_name, password, phone, email, is_deleted) FROM stdin;
3	username3	$2b$12$Ro4.WmDYHIbGCNFVKzUzbevNTa1H/RHmg/eNM1uaMqiwbFK32dUe.	0984331619	user3@example.com	f
5	username5	$2b$12$wnDDn1P5jIKfCPe8xSpbJOeq.WuGKz9sZHpMow4PcKkWYUo.U6Gui	0988066572	user5@example.com	f
6	username6	$2b$12$J7/eYseFng1aS3qa5lz5jOqKIcHThfMb/M6z4efhoUfr/wFa7vuHK	0989947476	user6@example.com	f
8	username8	$2b$12$JJRZZ5ef7QvQYs3zOABwP.NUaOTt782LprcUYdyyJBPMB3tlHCl.W	0982040201	user8@example.com	f
10	username10	$2b$12$hB6BJ082hDorHCYC7/5ScuhDCGD7msF3SFoAXqWVprtiaF/6Deo1K	0985576968	user10@example.com	f
12	username12	$2b$12$/J1vv5HJQeluSBMDSTFRF.o8y0KSKexuXJABIOtwSCGID3YJjJpwe	0984964994	user12@example.com	f
13	username13	$2b$12$EXgX40GZawA/kgzqWoRNYujRxLxIClmhfmfIw1eFCfbOAdofdHiNG	0988572230	user13@example.com	f
15	username15	$2b$12$QVFsiChcvvw7p841XNyF2uxQqEmG5bO38RVyjrO4h38ZuMUF6RaBi	0983234224	user15@example.com	f
17	username17	$2b$12$0P7zNvwr.jzi.eb.TPdkx.n0t4lTuTaOgZWX20EsWjJ7T7Is9uf5C	0981603318	user17@example.com	f
19	username19	$2b$12$KWRNe0r4J8c.jN9jV/F5Wuz6/oZsk3gmYoGEIsX0oqBnEt2uQiob.	0985520844	user19@example.com	f
20	username20	$2b$12$f//frvFvEgDTR6yaFiSQneE1AKoqO471.Y9HT0jYvlSnZulCcw9RK	0984438587	user20@example.com	f
22	username22	$2b$12$jgKwY7rdA4Lqnl/cg21SPebQEfQzra1iaAH2a0NULSn2eWlPfmEcO	0986963248	user22@example.com	f
24	username24	$2b$12$3RhhsyKOKRIUdj/8.vXPoul2Vm7K69JtXTu56uYvGStnPzQjFef4S	0981720730	user24@example.com	f
26	username26	$2b$12$J1ItoEGSi7v7.GTSltTSbukKsnd1ephI/NmdYRhICsbAX3XRNd2a.	0983794743	user26@example.com	f
27	username27	$2b$12$JPv/zigw.B2yn/zGRlxukO8nn0G574zXngV/eBUBUWF1a4kwTvz0q	0988702158	user27@example.com	f
29	username29	$2b$12$TbEMDWj95XiYeEhu6O.SW.WhjFzMiNxrf2eZ/sfnaxhwA7uJ80JTm	0989661157	user29@example.com	f
31	username31	$2b$12$fP8qntY93cL3h0K/94IbFuCA.qUdAVUH2WR79xjUBd0kDS3kYuSeC	0985802302	user31@example.com	f
33	username33	$2b$12$Rd6MdGND68vz9fUV2jUV3evH4/QUEzeEoGj1/EQzwZG9Hn20vUkgS	0981676143	user33@example.com	f
34	username34	$2b$12$qsKKbJ0QuoZJaQMf2Ig4zu3gkwgS86RAptGPvFy4IUb1vnkBenPnW	0983879619	user34@example.com	f
36	username36	$2b$12$atLeSU28Etxm/FHrXhjV.OtcXAYd2D5kVifRHocCAALPA1zx7Ay16	0981251667	user36@example.com	f
38	username38	$2b$12$LrXc3MQp9z2nzfbdJw3MMuptA4Z1zrXhj5YnQ6318r5xjsY4BrlH.	0981630653	user38@example.com	f
40	username40	$2b$12$4M87HKTJHatGkNNz4GvaWOB0eSTiDg64oHCGNSG9r6FLp8AurCyxW	0982070517	user40@example.com	f
41	username41	$2b$12$q.JJmVDcqOQv8ZFJojmXJeKLaNBCiC8pgNbRY80FoVCyl/Z0RSucO	0984528145	user41@example.com	f
43	username43	$2b$12$6dlTCY4TbvnjveLors29Muws/HSjXMr9y1R08dFTnbIRftlP7DLLK	0984488344	user43@example.com	f
45	username45	$2b$12$RKPu88rX5yDUsM2gm5wxAOzz7y/5CtHdajEAuIuC80QbUje.7x1BG	0984624503	user45@example.com	f
47	username47	$2b$12$72wEqMV.OrbboI.OajldaewF8gCA8HV6vlCi8bk/hdAqtix2xgcW.	0989510385	user47@example.com	f
48	username48	$2b$12$qvDwHsRthiB/NEhMWwCKfe/oM9AUdqNilsfFp.iSw1UYwkAPnfEuy	0983285273	user48@example.com	f
50	username50	$2b$12$5MDjmAjAycN9/PMhrMJYeuNdWMetla0MRBTbLqIx7mGoR.w/tPBC6	0984925070	user50@example.com	f
52	username52	$2b$12$HC4.LjkxG6hTS9JAMQoMIOHEtYXvwFHzAGBSXIH8Ya2x.LB/JB9/e	0989198924	user52@example.com	f
54	username54	$2b$12$YlHzpqesFjg3wgXdThYw4OkFkeuOuIbI7fCHivl3kNocJzaAeW/Y6	0982827619	user54@example.com	f
55	username55	$2b$12$NfUmcaJ5OZjWGp3eYJQpc.fCWAEdJLAz93iT/Ncz1f7LfZI8TnduG	0985339488	user55@example.com	f
57	username57	$2b$12$orIrjj9yMHYy8XZSrwSCAOt8ij0f75XDV40QD59aI29JF97NIQ17e	0985474725	user57@example.com	f
59	username59	$2b$12$GZ4NqHCzIoyxaAQF0yWExetWerhHTwq4a8xF029JjGg6GrH3Q8LLG	0988792762	user59@example.com	f
61	username61	$2b$12$qEdFtXusaKMY8SMOOxK5oOVUoSG4DlKFBoApnAkpSwDgQcTUcMdLa	0988831881	user61@example.com	f
62	username62	$2b$12$h5QsPApN1KxyPZ3qvJ0LYOpN9mYxFswSIpZp9ZMCZm1tIA8a3S3aC	0985655099	user62@example.com	f
64	username64	$2b$12$JVMXLlfI311pXga6pD3s9OlyiXX9.ic3zqBnqpRq8iRzWvyPP6N7G	0982059874	user64@example.com	f
66	username66	$2b$12$AZLBiQ/QXQKRWYL71XRHN.kB6WEWKiYdA2o/qAWYfYkUva8zHYKr2	0986964333	user66@example.com	f
68	username68	$2b$12$pPTvDTQgRvmD3XZVXivXn.t4cT3ItjhBKYhwEL0WKQGiVgO.xOK/W	0984490156	user68@example.com	f
69	username69	$2b$12$eJDiyQ5rhzo6rZ1LvgKrw.ps5ivEVxnmO5WxSF/ptMoNbfTRTXgnW	0988369929	user69@example.com	f
71	username71	$2b$12$z4O27obscktOmwCn1NhOieq0FKM/1Mry4ga8ji0UHZrgVjI6xY3Xi	0988532800	user71@example.com	f
73	username73	$2b$12$aQgyVstfKYM1Ie8v.Pwl6OY0r/uW/1VlJg00.mWTPJbwN2iJAOPXa	0987999757	user73@example.com	f
75	username75	$2b$12$uW9b2NTMYibLT29noF8oW.BGAmrFvyj9eFd15YGxxg8IB0m8lH7SC	0981941568	user75@example.com	f
76	username76	$2b$12$OSbZ6pQM4r9cBpKDkPfv.OFA9.hSxuAU805prDKcPiaqdaCC07UiC	0981078111	user76@example.com	f
78	username78	$2b$12$/T4.YKJfk5xUTZDVp4r8T..jHZbbPY9ePdrJWgXZuGDdpZ2qjNqrO	0986106596	user78@example.com	f
80	username80	$2b$12$Thb2JgZq9VKvPEb4pvWA/u2CTAsun/Uewd85rTjQwENYBHSlXCZ7.	0984928593	user80@example.com	f
82	username82	$2b$12$OfnCNPUUvQzdgejA6cVREO9dIAd1cS.g3IU2H.XbxULunu5.yPqbK	0982371915	user82@example.com	f
83	username83	$2b$12$VsidoxSmQ9H2wajN4WO8DODDZl4YqHnJRWQ19.IlQXY4kIUqEaq3.	0988438464	user83@example.com	f
85	username85	$2b$12$ZWeihh/QlVZe58k5dOecXOjzA6nOgd4f0TOriY.GKnNJ9x7O7v8CW	0981686034	user85@example.com	f
87	username87	$2b$12$ra2ZnUOAqRnQWadO610cLOal4Vh2Cn05AXfjIMMq4xVHZ/odQceVS	0987713658	user87@example.com	f
89	username89	$2b$12$hp96cJPKEORugVr0cirYierCe7tWj9ktTecLBoeTMBe9vAQfClMJu	0987195086	user89@example.com	f
90	username90	$2b$12$UHDSKwDjOzMRzxP2cYsXdOqT9iC9yeoZ8MhVT4T4ARD6.ta5hmmB2	0987143619	user90@example.com	f
92	username92	$2b$12$ToxVIaLzgWkVHa4EW1vK7.7mq6HrqY9dV2FgKEW5vdnByxuMMoVxS	0989231151	user92@example.com	f
94	username94	$2b$12$DlFpR6grXpBtRvLo/ERYIuTqnRoh8VlftEjlqGNVWS52sPzG6BJva	0985299189	user94@example.com	f
96	username96	$2b$12$PbkB/MraYT8Wd0d6G1p7s.m1L0/.mpahPC3kq69jzH.J5NM23dJKu	0985901822	user96@example.com	f
97	username97	$2b$12$VQ8M/noV4Gr8DBZkuPWBAOKGuMi7bjoF/aUc13h1WqeTuonHgRv7C	0981017497	user97@example.com	f
100	username100	$2b$12$N3ByD/QMEP3w.nJDkqTH/OEBBIuAL6TW6IYV1bNUAIAYPLNF0huXq	0982976055	user100@example.com	f
102	username102	$2b$12$pauyG6fmJgcgzO6p3p7Zm.y.KUkRKaUZqSN1uRNqm7j.uXwNKzyCK	0983155118	user102@example.com	f
103	username103	$2b$12$2E1nqTDT2ecrLVFFIoERBeSyeFsBJ0IwyV8IUcMuPW3gUX9YgCh/S	0987565956	user103@example.com	f
105	username105	$2b$12$dW/aX8Nzbxy6okjsVc.NfeJqn8spk2LG0ocLDEiIjpuG9CLzWEL6q	0984194734	user105@example.com	f
107	username107	$2b$12$tnvygERwOumWB1JbltNM/.3o2gyawvpHudd2z8PM9xa9lYUQTV0iG	0989355302	user107@example.com	f
109	username109	$2b$12$l4Dn1dHdLPduUWezFxwaFeLQcZqpxthbZ5OYM6uDnPPJm4as8K/E.	0981528201	user109@example.com	f
110	username110	$2b$12$DfFU/CBCLsH4Jk5NfuZyq.l7NJd37y.gfRh2CWdKtrfrRDIhl9alO	0989780992	user110@example.com	f
112	username112	$2b$12$cSflNN8V1PLRUrukOlSh8ukYA7fwJwPHVEVzgSuZNB6xpo6AqjCgO	0984183128	user112@example.com	f
114	username114	$2b$12$5gpsqbOXqH7TQmrLGoJDd.au1ybrhL2nBbwn/fgZUPi9w8nvbZCFi	0986161141	user114@example.com	f
116	username116	$2b$12$t1bmhzmy65tNmwLTqd8L0O2c2qJ5FD6QNBnzBHgGv9P3nun1JbcgS	0983678706	user116@example.com	f
117	username117	$2b$12$k8TuprRsGbi/3.mOR4NfWe9/pvF1WWQH2iviPaL8ZbYw8f44dYd.K	0985348512	user117@example.com	f
119	username119	$2b$12$KqlKNJ9mjGEcExmTny1I4.5wVN1yoeu/fRPJXVJhcOWx9hVwiobpa	0984760408	user119@example.com	f
121	username121	$2b$12$nzvVuWIXlVBO82xwb8z1V.qsxGKIiDsxpYtDcKVub66LVpfIlDLX6	0986230622	user121@example.com	f
123	username123	$2b$12$apyVXF.pJkVusZh1ey.cqOskvqT4yu1qg2p3Ur8LnUunqVgja3EFO	0988506700	user123@example.com	f
124	username124	$2b$12$qNmhIR.X5838Nh6nVIwYuOZygiG5MNsA8d3MFAf51wrLxYZQr7hwS	0988044991	user124@example.com	f
126	username126	$2b$12$d2gtnTZwov8fDDiQ7ELFj.VxR0z6jOThojugZnh/ogJM8zk0KeAyq	0981101915	user126@example.com	f
128	username128	$2b$12$.cr1YV.WZzinAozQZnkzQevvatOCphkarV6sCKnNv2r1AkRHxLbpS	0986782452	user128@example.com	f
130	username130	$2b$12$VZyQ7Nrd4T5Z5oh5VfWJYuFD5K0yj6RZNJV3xJ5UvBXUGefiNCGaO	0986260192	user130@example.com	f
131	username131	$2b$12$jxFbxnW0vvAIc7jUW5lvyu1glrzYhQWLHrET6fYEuLgIkQiytprS2	0981677576	user131@example.com	f
133	username133	$2b$12$Pi.sPYa8Ma8tl2yQNo4ySO.2Rf7i3FSOEx1R3J1eRGKr/pjVIJPJS	0986183198	user133@example.com	f
135	username135	$2b$12$1mi9CR4qeW8xlenqs.cGCu5nwR/rAms5scqC6B3OQ6aGuFC523XHy	0981882435	user135@example.com	f
137	username137	$2b$12$d0J8Lq.2zVRqd52qeGo44uRCcgCRlKZ4BSvWxM9FPSC9Kc0QERXjm	0981887056	user137@example.com	f
138	username138	$2b$12$IVbYN5razHI2Qf0zBUzJiuezeStOE0hCY4JWVFPeCNChmlhH6ee4m	0986176336	user138@example.com	f
140	username140	$2b$12$AG80xdnoSmSs.c41D/4/6OlBMw2R2YVa7jTm6bRbAZ2deuMCQN8FG	0988265611	user140@example.com	f
142	username142	$2b$12$bhX6T9UiC3lK911ZfRRPjOOpoFSCWZieLK6Z7xazXo/JOPoxGVU7m	0988602720	user142@example.com	f
144	username144	$2b$12$XYBGSpC7VjXgc5/L8KGNMutL6PZHoUCI5QdazoUAxipJPDlog3lX.	0983265955	user144@example.com	f
145	username145	$2b$12$Y5rRB8KssmpQGYrHoAQ5d..aHn66J6a3/idW7v7UgIe4Zn7Ki6HSS	0982409738	user145@example.com	f
147	username147	$2b$12$spg0ZOU05bv2FWOMsZOcPu3.W7jKc9GdI5GiGPdj9HGo9aKvXrDpm	0989983897	user147@example.com	f
149	username149	$2b$12$4D3U6sludFpMT4BVTetiJ.koCkXVeedqRSQpHIdoEJyzbqmHuKr.2	0989440834	user149@example.com	f
151	username151	$2b$12$IGaQ2bk7GU886mWZPCSynugCpRJBrDM3bakO5RPbc3XWupVWuhq2K	0986052623	user151@example.com	f
152	username152	$2b$12$WwtxY.tmooLmwCVxdNYBNeL2akCBTwCcW1Kf.RMoFqcskTiaolFnW	0982146731	user152@example.com	f
154	username154	$2b$12$iVkPQxKAy7QqJLaENAr8X.eIleqtMPEgdyBn1QP6kAUJAUYvh6RBe	0984538284	user154@example.com	f
156	username156	$2b$12$w8/qL2YPEgylKUFQadu9c.CpPG0U.606pLJINX6EFDJMIvAZr/KfC	0981838295	user156@example.com	f
158	username158	$2b$12$rxNzSgvS8qZvHPL.Rw0tmuBr7xYvnNWkEGliTdNHQDRSdRR2dAoaS	0988520170	user158@example.com	f
159	username159	$2b$12$rlmlsKVr4QCTweBqwqfGdubbkNSpfwYzNQXPGSA.GvvleQ67qQVNC	0987414698	user159@example.com	f
161	username161	$2b$12$l0rrsOoc5iy6uQ.yafId3epx/t3lUFAUZeGiDQKAr2tFYOejOPDIG	0986675034	user161@example.com	f
163	username163	$2b$12$Kb6kUjn9aKNuBwxf8OBx9uSdsKhWUyIw9P93DGEe90DiR.XEXFX92	0984253513	user163@example.com	f
165	username165	$2b$12$fFHBGHPT.28/wozf9VPm5uKSsgZpfUN3863D92Zd5AdvIXCMmNQSG	0987601621	user165@example.com	f
166	username166	$2b$12$mFHzWeibwR41beKamS7p3uwx9vFyixhhXaNw8fp.ef.SSV42VoGZ.	0983717519	user166@example.com	f
168	username168	$2b$12$XZsfamLMaDDCgleSM6DtKO1JgxtxfvPQPF0d.Z56wW6gQLuC0kQcm	0982321256	user168@example.com	f
170	username170	$2b$12$STolzCoKqOm2cgZR90gRUux6X6dTBQozunPg5TmY5CbDkHq6IZpNO	0983787494	user170@example.com	f
172	username172	$2b$12$fHrhDuSaHoeOcUZyMpbjrud6dR8dQJl5iUYHo5veUBZP3kCCxWQoG	0986664997	user172@example.com	f
173	username173	$2b$12$VYXRz3t4Sd9vSoHxCRGjauSAkPihy8zbnZPNC1kfCSLBuh/hdSKQ.	0983774098	user173@example.com	f
175	username175	$2b$12$1HDR81jJfrTMn65e5fL/yehwDua1cqCYxSKtD.Iyi3WXjXEmhlvry	0984392641	user175@example.com	f
177	username177	$2b$12$5x1Q5xUg21ukms1uKx7/w.6Rj2AncY7dzAIeVbpdM9MFITCmf3nca	0987467119	user177@example.com	f
179	username179	$2b$12$uwab4JOCl1vJYKjbZxnTJeh1u0cf4/Rq26EwRPUipVrA4LqCm/sv2	0988776841	user179@example.com	f
180	username180	$2b$12$Mz.ZhrEfhOZh0NP2qh2EAO7cv1vSATGc2EsTZQLUycQZ50x5bUx.2	0985502878	user180@example.com	f
182	username182	$2b$12$kHWrgTrpn3DLeE5knesm0eTtvgpNP80MExyFEhqAXtPCzn.eRZF4W	0983460105	user182@example.com	f
184	username184	$2b$12$ID4leKD1S05CuwQ3eoPbaOaX8uFued6GmMsmNli1fReE1PBPwO.FK	0981290390	user184@example.com	f
186	username186	$2b$12$MZNlGpdEd.Yg8yT1svQu0eDO1w7o0pRXXPVA5aXMt9gZoy/F9WFDG	0988224631	user186@example.com	f
187	username187	$2b$12$VCvHXG2erkj4DE9Ae5kSsepL1KiCActzNQq4MqPm1n8KvxqS83V22	0989684438	user187@example.com	f
189	username189	$2b$12$8uf5gqnPiHCQwm8CihyK0.neIHSl2Bwp3a1C/i1pahuqswhs7UIB6	0981172097	user189@example.com	f
191	username191	$2b$12$kD9qXMhn72x2zSMqIDJRkOak8rXo22Z03hzC8qNvSdRTrxTlIDpm.	0984825602	user191@example.com	f
193	username193	$2b$12$OkzAIa3ZDq9rLF6PS2zuIuFMa6592IwatlN14aZTLDxcGbunx7rdO	0986956020	user193@example.com	f
194	username194	$2b$12$iVWAHVZOi/SYUpqocgQkfODEOk7vHv42M9IX.CVwweyATnAmo6L3u	0988409457	user194@example.com	f
104	username104	$2b$12$FdIKf1xMu8Z8cQzEmzzTruq9zKGhMuJVN1dUcCsPbKDWupHPiA4iy	0984766948	user104@example.com	f
1	username1	$2b$12$Z90jecJQ2jOPpkC5CYIDOudlaSj9eftil98mZaC.Fiz2O6ZWh4V6u	0987983725	user1@example.com	f
2	username2	$2b$12$hsa.eosjeyMuwaS/n4PSz.8BHaXoQdn3wP7mrMzZqwW4V3rIvGf3u	0983016717	user2@example.com	f
4	username4	$2b$12$OBjlm5lm8exPOcokc3M7kuxdL6eTYK0FDlzkHIkBSD8BKKOf7UHlS	0987497252	user4@example.com	f
7	username7	$2b$12$Ds1PzX0vNw9Zer4DhJpLze.z1MO8bsZCTvU2BkPcLFRDyYoJgQP1u	0986831760	user7@example.com	f
9	username9	$2b$12$iuhXLoe.6Pcx0VgAo6vJ5ey61gaJN34voG3qZQVjUCarBfvfHfleq	0982113775	user9@example.com	f
11	username11	$2b$12$wgLB7Edt2npUT6fH7K5M8.4cBgZm6NRdL2EVtojMXea.5J7D7wdom	0984453427	user11@example.com	f
14	username14	$2b$12$lppCwReSzOadLkwbNqDmMOlIbGcNRSCgB2RsEybjXZejwfH9rihh6	0988574166	user14@example.com	f
16	username16	$2b$12$gVYyxnU./vyzTAt8dCVinOkRJbDIN9X2ysWgWG4LomqrtQyIKJgju	0988072648	user16@example.com	f
18	username18	$2b$12$2UKcwKeQBiWQB.wetLbf3urKhacIwajT.nNin/4vvQQOscwiyh8we	0989963183	user18@example.com	f
21	username21	$2b$12$RJBprTGIsb2p/ttvDl8STugPyCwGDQjIdwEJz7HA5JXX6XuncOE7S	0981899086	user21@example.com	f
23	username23	$2b$12$j7iU3IuFR8nt3arLHyFzxu1IPxY6me3lm82Zd0ArFzY.wbdLhnbUq	0984669228	user23@example.com	f
25	username25	$2b$12$aj0djDqMDaz.dSjE0E.Cxu0mih.PlJ5tLOopBy2hzSAYIXWY74xP6	0986913563	user25@example.com	f
28	username28	$2b$12$RCd1ShW/G.uryh8/4/F3EeFNtuqfutFVpKkO4TQObNVJhfQppX82G	0987601383	user28@example.com	f
30	username30	$2b$12$JzJTKDYe.xI.XpCI.n3NyOuYMsuSVIo8KPwxpJmdp3GbmAKy9c/2m	0989727631	user30@example.com	f
32	username32	$2b$12$adDI5E2/fUucLHUrgVMfmeSvDyxy2JQ7TAfGelX3IrjjEEmLYujJG	0987108587	user32@example.com	f
35	username35	$2b$12$XLN/t3w6Z9raklswj/LfluFQoywcl3NY3C4dMAeOZvLYjrLtPVLcK	0984484328	user35@example.com	f
37	username37	$2b$12$rdDFQqAdFjdBcQt9JFOOHeLFUMhXHaKkmxype46US7yKa0ZgaPMwu	0985089975	user37@example.com	f
39	username39	$2b$12$buLIDl/VW/d0aJ72Qajjauwo8SE5kizoMAVcNJO1qlZ0f7fO6R1IC	0983989282	user39@example.com	f
42	username42	$2b$12$ivamq03/C3N22AZcUxGMfeMOeDvp/pWRzdJcLIc7GDKn2qm1OxU5u	0989716726	user42@example.com	f
44	username44	$2b$12$OhwbIRzPu8zAwxwIuyisFO62TMT2vou3wBwbTvkWrOdn9tISME.IS	0982481006	user44@example.com	f
46	username46	$2b$12$SBMeVWgS0kzyzAmFS11uhu8S/boBfvBbrN.c.CD0dwaYichLH6Yvu	0982254992	user46@example.com	f
49	username49	$2b$12$tc21ir9WHTm8zZNxC8FqQ.DPYZbMn/4DlHiYOtv66NPrJ5ZQ9qZZW	0989538409	user49@example.com	f
51	username51	$2b$12$HKIFv0.hqoSiyYutE/27i.lpUICiONeaN/5fUWudMrTJUVvDr1AYO	0981828661	user51@example.com	f
53	username53	$2b$12$m9owoGVvbI6S8H2yjZBxyu4q1QFTCASlx4XafZjXQUqWBlj7TTaT.	0984936328	user53@example.com	f
56	username56	$2b$12$dMfxAg.JGazaCTRB/ZbKg.gZjIDeWuCH8sk69fW3yAu8l2uI2eHf2	0985724735	user56@example.com	f
58	username58	$2b$12$ZkfRnlbQ./xAIMTjjqoNjex.IeslM.l6l7F32utgEXT/2YwWe8r8m	0987145884	user58@example.com	f
60	username60	$2b$12$EaIV0QN5uZjVxY.UDCLHuu3gTDX.vq1dIVse7lfYiHQGTw.wWe24G	0981268326	user60@example.com	f
63	username63	$2b$12$QhuS18sSl214zYKm2i1CGOPyjrF6vwakOsbfFn.itDehtMzXWdyqe	0987262358	user63@example.com	f
65	username65	$2b$12$LWz/wqjdoPhbhlp1JT7FBuZnRnQeCPMU2boRedKrtIZTxe/5iBGmS	0981127470	user65@example.com	f
67	username67	$2b$12$LMrOQVorxqr35YJGHyewiuBOCTEqUNAQgDKyXxjDdAe378hOJPJDK	0985023153	user67@example.com	f
70	username70	$2b$12$gK9bkic51xrC71nSU/i/3OXmpCbTQOYyTU80EUTzkPhxWYqZkJaiS	0986152672	user70@example.com	f
72	username72	$2b$12$QtUkZZXXG3/wnNEOJQxQ3OMBPisyzkn.WuxaFy5rTalZlY489pBRS	0982629594	user72@example.com	f
74	username74	$2b$12$hUISpDKTHNeUnif3aYg2Xew/NZjsRcNDwqZEauivhYp97W8.xiz7S	0984670402	user74@example.com	f
77	username77	$2b$12$glWNHkh/Pzl.Eh/CIlq9nO1YxHqKQMHKVyyAJxm0a2ZBdPA1r0oL.	0982474405	user77@example.com	f
79	username79	$2b$12$javF3iiandEopKpAcloDrefFQu37EtheZShneOaQ8oSLlpbRZ148S	0988640522	user79@example.com	f
81	username81	$2b$12$YtP5ljumyq2H1eLt33wH6e01GCX9OtLjAd98NIDb7HlTf80UtGF/W	0981805176	user81@example.com	f
84	username84	$2b$12$NhNTMLeeFDbbdVKvN2SBKu7TQDSVWkyRD2KudR27.JaCqxcxt5VcK	0985654248	user84@example.com	f
86	username86	$2b$12$foGhGEqp0L9Ow74RNJx/1ORCYDoVaa6ry2PIxq6yP0CyQONuHXzOy	0988047286	user86@example.com	f
88	username88	$2b$12$Q5yjPWmV6kdFKqT6LFsXdOoqamvQN5wEi8y8iZXf8EQisXw0ZHL3K	0988282955	user88@example.com	f
91	username91	$2b$12$OrUObO0ddQWaY0gcsiSD2O06K4Yspba5WGjjJMBh26LkhfRIc3c4.	0988276893	user91@example.com	f
93	username93	$2b$12$ew8AxJWqD1FjBIJlVoCizuDVNtbubGk78MkaghviwjNrXbBuHUWoO	0982628831	user93@example.com	f
95	username95	$2b$12$4XPCVDK26f7iOIUpPcY.nuPo2zZG3a1JmI1qzHIbH6hP/6ZSohT9K	0985419757	user95@example.com	f
98	username98	$2b$12$jsNxEDGnyjAQo8rTMSqMc.jX0juoQsxVmQVqPUtMBU0qhDUi2uP.K	0985579852	user98@example.com	f
99	username99	$2b$12$T8afIbnUQkXFrSrS9O7aKOBae55giR5sUhjTvYaUfQgAc0YMuIxoa	0987217844	user99@example.com	f
101	username101	$2b$12$nyTNNALZaBbnBvLxy/H9pe3.1Kh2Xc36nNELbyvscEXVQJ.dVUjD2	0984875362	user101@example.com	f
106	username106	$2b$12$zA.obUetF8qgx2x.Zr2D2OqnhDhfev8kowRgC3UauBpU6Z84SeLQC	0989827342	user106@example.com	f
108	username108	$2b$12$GnVKhH.VqYqpLj/OIwmZyOSpTOeqaqdJzgjSmaUIIY1n2iBJkNO9u	0983653562	user108@example.com	f
111	username111	$2b$12$8VUaqf9NEUOSE7vi8LCh6.hFgFYsrlyq.eS3Nl0R3Ov6iLITmaM8W	0982655172	user111@example.com	f
113	username113	$2b$12$HnKYZg4sTR.T.djho9flOOaY.uugBD618vmozqsdmedMMMPyvA55.	0987117044	user113@example.com	f
115	username115	$2b$12$242/jJp3edhd0CYlArQ2Ju4gzRjXA19x8JopM5wb87VzRzgGkvlT6	0984152729	user115@example.com	f
118	username118	$2b$12$pPKUVMzT.BlHDMkHJkdPY.K3S4vwUbNFypy9Yys7kjvoYSHcUviIG	0982766480	user118@example.com	f
120	username120	$2b$12$VyRwE7hxAjPFTZlAonZFS.TkoPnqqLnKnkoxD7qOgnaQpn698Sdpe	0984703820	user120@example.com	f
197	username197	$2b$12$md8XCACDdiOf3yVuvH6MEOxPMU4yoL6wJcd3O..rR9xKuaVhhD1ga	0982652295	user197@example.com	f
198	username198	$2b$12$qlcq/akWb.rX6kV95iqNV.c1SKCLixYweWglfNBiLK7HVjBKMNG6S	0986709591	user198@example.com	f
200	username200	$2b$12$xxurgf6OI3bh64EW44yetOziaMDjvU9hZHNMIl0nTfB6RCRFXAx9q	0984392555	user200@example.com	f
122	username122	$2b$12$/DeD4a6ZIi5rdtjww3DoUebAnomNo9owN.aDker2aa913VEktfkuu	0989334013	user122@example.com	f
125	username125	$2b$12$SFah7E2uSFb6s3XJa9O1rOqSA9ii1a4cuwGDHPIKqQ5tbyN6hSnjW	0982527475	user125@example.com	f
127	username127	$2b$12$IBpObmpKKrhQuY.Rl8MIvehAUAt9oihLJJRpZ9chqM9rnvjtu/iBe	0986499702	user127@example.com	f
129	username129	$2b$12$K9n8hBA8.N.I30VZ48vWo.zOE0UZZajvfP9SWft55LDcKK8A48MLy	0987100124	user129@example.com	f
132	username132	$2b$12$1Wl3RKmW7nfUolVMiioDUOcZMs.LBqHO6xufnuUqWIuvVJzLmcBbO	0984728691	user132@example.com	f
134	username134	$2b$12$siqLpJS2jPPlwq/sijLLd.hmmy5o3uWU.uTVkbRKj770bIFxqY1za	0982964530	user134@example.com	f
136	username136	$2b$12$HxUN.bV1uT87xnGoTsqF.uoLmtq6F1TLdHuo4c/N9bIndNZkEN55q	0983198712	user136@example.com	f
139	username139	$2b$12$pbdir3egRfd9BAc9B3DI0eAGlN76YIGWyt.lz4KHHE2bLTkpk1M7e	0985715041	user139@example.com	f
141	username141	$2b$12$UOREe1fCjtx2TlnvI9x/LezS0IYs27b4.yCs5qlQE1Vp.dG7UN9pW	0989124069	user141@example.com	f
143	username143	$2b$12$W/nu09XHcCQMOosx5YtAX.hdlLXWvHKSdFmjXDzt1c7IleIey1SR2	0982819566	user143@example.com	f
146	username146	$2b$12$C8RWAcjnjkRMKhpdfHV2GOSI9/wxN5nFhFwjbX6CuddF6Z7hhqR1K	0983944521	user146@example.com	f
148	username148	$2b$12$yIr0cS3nDg7OLzjR9N4eT.4F2J1AAJhDRmthAmyP.l3eJk1t1Ql4y	0987582449	user148@example.com	f
150	username150	$2b$12$e5oJPCxtAUsqJn7kygxv8.0lmUsgJRLA4EndO6lkDYWR.MRtv3IYq	0988030887	user150@example.com	f
153	username153	$2b$12$g/YT2/E8PHA189tamswqIeL7ahoCRb3YSOSi.x6gRRh7pIjssG3qG	0986670353	user153@example.com	f
155	username155	$2b$12$Y//j4/eXTOEJ89PuueTsP.MmbSCE8xFhAF7dq0V7tkvA7REIQfd62	0983739528	user155@example.com	f
157	username157	$2b$12$76yjmZkZjAdKmZcXTk8ciuAjTHx4nqapeadKSbBgv1glu9FNqjFTG	0988436081	user157@example.com	f
160	username160	$2b$12$kqeJcB5no77JeIe71YxMqOX1l5b.8.l2o4tu.3.WsedfIgwKNsMyC	0988265948	user160@example.com	f
162	username162	$2b$12$1.bS9xLWZC1W4FjgUoKMNemSXADcpnL2wh3MQ/1pdiZxJYqB25DN.	0981565159	user162@example.com	f
164	username164	$2b$12$nsdp2EVk1ppcenqT95bEq.q/lbWIZuIZ/4thQdbSAVJ67mDXR0MGi	0981714310	user164@example.com	f
167	username167	$2b$12$JBfcEE71U4PsqPUC5wiLU.LiKHiKxgq8ioB4TymiHJr9sNMq2QxCK	0983689386	user167@example.com	f
169	username169	$2b$12$.PnYbA2ouhxKAFWT5mq1k.ABPxJXguGsBrYrQQz0nvJsYJd5M12R.	0989981194	user169@example.com	f
171	username171	$2b$12$HXBLqjLcbWOqpvcExfuCZ.uicePrWfWzds3I10tpwywjQrKvxOH8m	0982839728	user171@example.com	f
174	username174	$2b$12$/dn81A0lLZO3Dc66cgyDrOuqB7ATQwEHvdWGl.Bv.uIBmMDtNhUL2	0987113351	user174@example.com	f
176	username176	$2b$12$HUC1V8dxCjXxFX1jSVa1tuMdAj4xGAKKYoOvRyNiWrFQ6mtHq/S6u	0989016348	user176@example.com	f
178	username178	$2b$12$RAg0l4sodNEXkTofX.AEPuCJVD3YrypWK34MKrsEdnL9rqLePHtSy	0987352456	user178@example.com	f
181	username181	$2b$12$c9GSkJ0cqpZQC3/cwV37ye.xeOXotso/Ypsv0QTA46FDTgsSbq7UO	0982523921	user181@example.com	f
183	username183	$2b$12$oSxrL/g6a0/gv5GYvmjj4.SzSRpM7/439PoUeKRgQL3ELXGNVqNW.	0984258303	user183@example.com	f
185	username185	$2b$12$BtIPJzrvdZQ8tfOZA/whnOgadMtmrLkRm8AypAMHUmt3iljlaOWZS	0982080102	user185@example.com	f
188	username188	$2b$12$wI6Q0bWUuM5dSl8AxxLdIu5LKiubk2wCdXSi.O7hCgWRCQ8PEeIQ2	0983863684	user188@example.com	f
190	username190	$2b$12$oaZ.QPF0ntfToaqvnuNtz.0r6l2E16htNFpkttKSjle/oNVu.1Hoa	0984544944	user190@example.com	f
192	username192	$2b$12$0aRPJX.cvaZssdIaaBnvGO3t0tGbJs1Z6u.Sh.J.R3xuofh3sipmq	0986404575	user192@example.com	f
195	username195	$2b$12$m9D4QfTsasz3vfXIdsab.uXdTt2rmf.S13xlbCO.gRHCpL58wkO2C	0984833398	user195@example.com	f
196	username196	$2b$12$NoSFB8eLWMeO/lEqLuw08.aLokmFTXZGluor4dN6MyE5rUUMjl/fG	0981482662	user196@example.com	f
199	username199	$2b$12$Fm8mSvxbZ/rjv1ETcKYwFO/heFCdJEjOVCL1jwT6WflZi3TR3tyaq	0989750250	user199@example.com	f
211	spicyginger	$2b$12$4Jn33JflDhAou5D.TSgZKeFuoVi7P4RZ.eigy5qrhcDUADmmAEvWq	0835643992	vuhuyentram1@gmail.com	f
213	spicyginger2	$2b$12$DDn6t8HGdtMEu8mTD2WJaO/xOY11bBupHr8APyDglzlerRpUDkoTO	0835643983	vuhuyentram2@gmail.com	f
212	spicyginger1	$2b$12$wmhPtC0L.DJG7fcWNr4BaeoPLi7ellGhQjmL1TWNpAYedQ9z7D/Ia	0835643993	buncalongca2@gmail.com	f
214	spicyginger3	$2b$12$SOnWI5F14/PuKcyvvfgijO5kBu8.39NJ0lcbOpyHv.wgvJaxnktLm	0835643555	vuhuyentram357@gmail.com	f
215	spicyginger4	$2b$12$XJrSejpfa8ABEoDRc6mBZuT.JpbDznv/CFMS1nV.piTEdTc9KZTpq	0123987546	gungcaycay@gmail.com	f
216	spicyginger5	$2b$12$r2m48hGt2ouG6aY7v6SI/u7y0IRhJPl4hBNHi0THYsCR5eXB/MgXq	0123987545	gungcaymuoiman@gmail.com	f
\.


--
-- Name: cus_dri_chats_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cus_dri_chats_chat_id_seq', 1, false);


--
-- Name: cus_dri_messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cus_dri_messages_message_id_seq', 1, false);


--
-- Name: cus_res_chats_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cus_res_chats_chat_id_seq', 1, false);


--
-- Name: cus_res_messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cus_res_messages_message_id_seq', 1, false);


--
-- Name: managers_manager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.managers_manager_id_seq', 200, true);


--
-- Name: menu_items_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_items_item_id_seq', 2016, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 113, true);


--
-- Name: res_dri_chats_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.res_dri_chats_chat_id_seq', 1, false);


--
-- Name: res_dri_messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.res_dri_messages_message_id_seq', 1, false);


--
-- Name: restaurants_restaurant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurants_restaurant_id_seq', 200, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 216, true);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (admin_id);


--
-- Name: cus_dri_chats cus_dri_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_dri_chats
    ADD CONSTRAINT cus_dri_chats_pkey PRIMARY KEY (chat_id);


--
-- Name: cus_dri_messages cus_dri_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_dri_messages
    ADD CONSTRAINT cus_dri_messages_pkey PRIMARY KEY (message_id);


--
-- Name: cus_res_chats cus_res_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_res_chats
    ADD CONSTRAINT cus_res_chats_pkey PRIMARY KEY (chat_id);


--
-- Name: cus_res_messages cus_res_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_res_messages
    ADD CONSTRAINT cus_res_messages_pkey PRIMARY KEY (message_id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- Name: drivers drivers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivers
    ADD CONSTRAINT drivers_pkey PRIMARY KEY (driver_id);


--
-- Name: managers managers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_pkey PRIMARY KEY (manager_id);


--
-- Name: managers managers_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_username_key UNIQUE (username);


--
-- Name: menu_items menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (item_id);


--
-- Name: merchants merchants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.merchants
    ADD CONSTRAINT merchants_pkey PRIMARY KEY (merchant_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (item_id, order_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: res_dri_chats res_dri_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.res_dri_chats
    ADD CONSTRAINT res_dri_chats_pkey PRIMARY KEY (chat_id);


--
-- Name: res_dri_messages res_dri_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.res_dri_messages
    ADD CONSTRAINT res_dri_messages_pkey PRIMARY KEY (message_id);


--
-- Name: restaurant_times restaurant_times_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_times
    ADD CONSTRAINT restaurant_times_pkey PRIMARY KEY (restaurant_id, day);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (restaurant_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_user_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_name_key UNIQUE (user_name);


--
-- Name: cus_dri_chats FK_cus_dri_chats.customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_dri_chats
    ADD CONSTRAINT "FK_cus_dri_chats.customer_id" FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;


--
-- Name: cus_dri_chats FK_cus_dri_chats.driver_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_dri_chats
    ADD CONSTRAINT "FK_cus_dri_chats.driver_id" FOREIGN KEY (driver_id) REFERENCES public.drivers(driver_id) ON DELETE CASCADE;


--
-- Name: cus_dri_messages FK_cus_dri_messages.chat_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_dri_messages
    ADD CONSTRAINT "FK_cus_dri_messages.chat_id" FOREIGN KEY (chat_id) REFERENCES public.cus_dri_chats(chat_id) ON DELETE CASCADE;


--
-- Name: cus_res_chats FK_cus_res_chats.customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_res_chats
    ADD CONSTRAINT "FK_cus_res_chats.customer_id" FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;


--
-- Name: cus_res_chats FK_cus_res_chats.restaurant_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_res_chats
    ADD CONSTRAINT "FK_cus_res_chats.restaurant_id" FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(restaurant_id) ON DELETE CASCADE;


--
-- Name: cus_res_messages FK_cus_res_messages.chat_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cus_res_messages
    ADD CONSTRAINT "FK_cus_res_messages.chat_id" FOREIGN KEY (chat_id) REFERENCES public.cus_res_chats(chat_id) ON DELETE CASCADE;


--
-- Name: managers FK_manager.restaurant_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT "FK_manager.restaurant_id" FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(restaurant_id) ON DELETE CASCADE;


--
-- Name: menu_items FK_menu_items.restaurant_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT "FK_menu_items.restaurant_id" FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(restaurant_id) ON DELETE CASCADE;


--
-- Name: order_items FK_order_items.item_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "FK_order_items.item_id" FOREIGN KEY (item_id) REFERENCES public.menu_items(item_id) ON DELETE CASCADE;


--
-- Name: order_items FK_order_items.order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "FK_order_items.order_id" FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- Name: orders FK_orders.customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_orders.customer_id" FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;


--
-- Name: orders FK_orders.driver_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_orders.driver_id" FOREIGN KEY (driver_id) REFERENCES public.drivers(driver_id) ON DELETE CASCADE;


--
-- Name: orders FK_orders.restaurant_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_orders.restaurant_id" FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(restaurant_id) ON DELETE CASCADE;


--
-- Name: res_dri_chats FK_res_dri_chats.customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.res_dri_chats
    ADD CONSTRAINT "FK_res_dri_chats.customer_id" FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(restaurant_id) ON DELETE CASCADE;


--
-- Name: res_dri_chats FK_res_dri_chats.driver_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.res_dri_chats
    ADD CONSTRAINT "FK_res_dri_chats.driver_id" FOREIGN KEY (driver_id) REFERENCES public.drivers(driver_id) ON DELETE CASCADE;


--
-- Name: res_dri_messages FK_res_dri_messages.chat_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.res_dri_messages
    ADD CONSTRAINT "FK_res_dri_messages.chat_id" FOREIGN KEY (chat_id) REFERENCES public.res_dri_chats(chat_id) ON DELETE CASCADE;


--
-- Name: restaurant_times FK_restaurant_times.restaurant_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_times
    ADD CONSTRAINT "FK_restaurant_times.restaurant_id" FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(restaurant_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

