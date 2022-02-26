--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: concepts; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.concepts (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    topic_id integer
);


ALTER TABLE public.concepts OWNER TO developer;

--
-- Name: concepts_id_seq; Type: SEQUENCE; Schema: public; Owner: developer
--

CREATE SEQUENCE public.concepts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.concepts_id_seq OWNER TO developer;

--
-- Name: concepts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: developer
--

ALTER SEQUENCE public.concepts_id_seq OWNED BY public.concepts.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name character varying NOT NULL,
    link character varying NOT NULL,
    description character varying,
    levels integer NOT NULL,
    weightage numeric[] NOT NULL,
    major_concept_id integer
);


ALTER TABLE public.games OWNER TO developer;

--
-- Name: games_concepts_concepts; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.games_concepts_concepts (
    games_id integer NOT NULL,
    concepts_id integer NOT NULL
);


ALTER TABLE public.games_concepts_concepts OWNER TO developer;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: developer
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_id_seq OWNER TO developer;

--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: developer
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: gradedgamesdata; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.gradedgamesdata (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    question_data character varying NOT NULL,
    student_response character varying NOT NULL,
    result character varying NOT NULL,
    score numeric NOT NULL,
    feedback character varying,
    whatwentwrong character varying,
    timestamps character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    game_id integer,
    student_id integer
);


ALTER TABLE public.gradedgamesdata OWNER TO developer;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO developer;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: developer
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO developer;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: developer
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: practicegamesdata; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.practicegamesdata (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    question_data character varying NOT NULL,
    level integer NOT NULL,
    student_response character varying NOT NULL,
    result character varying NOT NULL,
    score numeric,
    feedback character varying,
    whatwentwrong character varying,
    timespent character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    game_id integer,
    student_id integer,
    error character varying
);


ALTER TABLE public.practicegamesdata OWNER TO developer;

--
-- Name: practiceprogresstable; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.practiceprogresstable (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    levels_played boolean[] NOT NULL,
    progress numeric DEFAULT '0'::numeric NOT NULL,
    game_id integer,
    student_id integer
);


ALTER TABLE public.practiceprogresstable OWNER TO developer;

--
-- Name: querytable; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.querytable (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    who_are_you character varying NOT NULL,
    query character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.querytable OWNER TO developer;

--
-- Name: querytable_id_seq; Type: SEQUENCE; Schema: public; Owner: developer
--

CREATE SEQUENCE public.querytable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.querytable_id_seq OWNER TO developer;

--
-- Name: querytable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: developer
--

ALTER SEQUENCE public.querytable_id_seq OWNED BY public.querytable.id;


--
-- Name: readingmaterials; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.readingmaterials (
    id integer NOT NULL,
    content character varying,
    concept_id integer
);


ALTER TABLE public.readingmaterials OWNER TO developer;

--
-- Name: readingmaterials_id_seq; Type: SEQUENCE; Schema: public; Owner: developer
--

CREATE SEQUENCE public.readingmaterials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.readingmaterials_id_seq OWNER TO developer;

--
-- Name: readingmaterials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: developer
--

ALTER SEQUENCE public.readingmaterials_id_seq OWNED BY public.readingmaterials.id;


--
-- Name: readingmaterialsdata; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.readingmaterialsdata (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    read boolean DEFAULT false NOT NULL,
    timespent text,
    timestamps text,
    reading_material_id integer,
    student_id integer
);


ALTER TABLE public.readingmaterialsdata OWNER TO developer;

--
-- Name: readingprogresstable; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.readingprogresstable (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    reading_material_id integer,
    student_id integer
);


ALTER TABLE public.readingprogresstable OWNER TO developer;

--
-- Name: students; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.students (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying,
    class integer,
    name character varying NOT NULL,
    phone_number character varying,
    organisation character varying,
    role character varying,
    language character varying(15) DEFAULT 'en-US'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    experience jsonb DEFAULT '[]'::jsonb NOT NULL
);


ALTER TABLE public.students OWNER TO developer;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: developer
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO developer;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: developer
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: topics; Type: TABLE; Schema: public; Owner: developer
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying
);


ALTER TABLE public.topics OWNER TO developer;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: developer
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topics_id_seq OWNER TO developer;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: developer
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: concepts id; Type: DEFAULT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.concepts ALTER COLUMN id SET DEFAULT nextval('public.concepts_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: querytable id; Type: DEFAULT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.querytable ALTER COLUMN id SET DEFAULT nextval('public.querytable_id_seq'::regclass);


--
-- Name: readingmaterials id; Type: DEFAULT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingmaterials ALTER COLUMN id SET DEFAULT nextval('public.readingmaterials_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Data for Name: concepts; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.concepts (id, name, description, topic_id) FROM stdin;
1	Constraints and Formulation	\N	1
2	Constraints Propagation	\N	1
3	Heuristics	\N	1
4	Backtracking	\N	1
5	Proposition and Boolean Variables	\N	2
6	Boolean Operators	\N	2
7	Logical Expressions & Syntax	\N	2
8	Semantics	\N	2
9	Evaluating Expression	\N	2
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.games (id, name, link, description, levels, weightage, major_concept_id) FROM stdin;
1	Find Crossword Nodes	/find-nodes/	In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\n    You get score = (correctNodeCount - 0.5 * wrongNodeCount) / (correctNodeCount + missedNodeCount)) and 0 if the quantity becomes negative.	3	{6,0,0,0.3,0,0,0,0,0}	1
2	Draw Crossword Graph	/draw-crossword-graph/	In this game, you are given a crossword grid along with the row and column number and you need to draw the graph for the crossword. If two nodes are connected by an edge, you need to enter the two nodes from the drop-down list. To add an edge, press the “Add Edge” button. Press on the "Check Answer” button to get the result.You get score = (correctEdgeCount - 0.5 * wrongEdgeCount) / (correctEdgeCount + missedEdgeCount)) and 0 if the quantity becomes negative.	3	{12,0,0,0.3,0,0,0,0,0}	1
4	Arc Consistency	/arc-consistency/	In this game, you are given a crossword grid along with the \n        row and column number. You have the set of words which are already node \n        consistent for each node and you need to determine which words will remain in the \n        domain of each node after enforcing arc consistency. Blue color implies it is in the \n        domain while Yellow color implies it is not in the domain. Clicking on Blue colored word turns it Yellow and hence excludes it from the domain.\n        Clicking on Yellow colored word turns it Blue and hence includes it in the domain.Press on the “Check \n        Answer” button to get the result. You get score = (Number of nodes whose domains are made Arc Consistent)/(Total number of nodes).\n        	2	{0.4,9,0,0,0,0,0,0,0}	2
5	Expression Evaluation	/evaluate-expression/	This game is about evaluating the boolean expressions when the values of the variables have been provided. \n    After Evaluating the expression, you need to enter the answer in the TextBox provided and Press the “Check Answer” button to Verify your Answer.\n    The graph on the right shows how the expression can be modelled using a Directed Acyclic Graph. Note that Red edges denote left operand and Blue edges denote right operand. To visualize how the expression gets evaluated using a graph, press the “Visualize” button.\n    You get score = 0 if you give wrong answer and 1 if you give correct answer.	4	{0,0,0,0,0,0,0,1,14}	9
6	Match Expression with Node	/match-expression/	In this game, you are given a graph which corresponds to some boolean expression with the id of each node specified alongside. Red edges denote left operand and Blue edges denote right operand. You have a list of subexpressions and for each of the subexpressions, you need to enter the id of the node which corresponds to that subexpression. After entering values in all textboxes, press “Check Answer” to check the result.\n\n    You get score = (Correctly Marked Node IDs)/(Total Number of Node IDs asked).	4	{0,0,0,0,0,0,1.5,0,10}	9
7	Write Expression	/write-expression/	In this game, you are given a graph which corresponds to some boolean expression with the id of each node specified alongside. Red edges denote left operand and Blue edges denote right operand. Find the expression which corresponds to the node at the highest level and enter it in the textbox while following proper syntax. All subexpressions must be within brackets (). Press on the “Check Answer” button once you are done. Your answer will be considered correct as long as the actual expression and your expression are logically equivalent.\n    You get score = 0 if you give wrong answer and 1 if you give correct answer.	4	{0,0,0,0,0,0,4,0,14}	9
3	Node Consistency	/node-consistency/	In this game, you are given a crossword grid along with the \n        row and column number. You have the set of words with which you want to fill up \n        the grid and initially all words are in the domain of all nodes. Blue color \n        implies word is in the domain while Yellow color implies it is not in the domain. \n        Clicking on Blue colored word turns it Yellow and hence excludes it from the domain.\n        Clicking on Yellow colored word turns it Blue and hence includes it in the domain.\n        Press on the “Check Answer” button to get the result. You get score = (Number of nodes whose domains are made Node Consistent)/(Total number of nodes).	2	{0.4,7,0,0,0,0,0,0,0}	2
\.


--
-- Data for Name: games_concepts_concepts; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.games_concepts_concepts (games_id, concepts_id) FROM stdin;
1	1
1	2
1	3
1	4
2	1
2	2
2	3
2	4
3	1
3	2
3	3
3	4
4	1
4	2
4	3
4	4
5	5
5	6
5	7
5	8
5	9
6	5
6	6
6	7
6	8
6	9
7	5
7	6
7	7
7	8
7	9
\.


--
-- Data for Name: gradedgamesdata; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.gradedgamesdata (id, question_data, student_response, result, score, feedback, whatwentwrong, timestamps, created_at, game_id, student_id) FROM stdin;
48cbd81d-ab5c-410f-8814-0136a84494c7	[{"num_vars":2,"num_nodes":5,"x_coor":[0,0,0,0,1],"content":["|","|","a","b","~"],"y_coor":[0,1,2,3,2],"edge_carvature":[[0,3],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,3],[2,4],[],[],[3]],"exp_to_display":["( a | ( ~ b ) )","( ( a | ( ~ b ) ) | b )","( ~ b )"],"indices":[1,3,0,4,2],"ptr":0},{"num_vars":2,"num_nodes":6,"x_coor":[0,0,0,0,1,1],"content":["|","<=>","&","a","b","~"],"y_coor":[0,1,2,3,3,1],"edge_carvature":[[0,0],[0,2],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,5],[4,3],[4,3],[],[],[2]],"exp_to_display":["( b <=> a )","( ( b <=> a ) | ( ~ ( b & a ) ) )","( ~ ( b & a ) )","( b & a )"],"indices":[1,0,4,3,5,2],"ptr":0},{"num_vars":3,"num_nodes":7,"x_coor":[0,0,0,1,0,1,2],"content":["|","=>","&","<=>","a","b","c"],"y_coor":[0,1,2,2,3,3,3],"edge_carvature":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,5],[2,3],[6,4],[5,4],[],[],[]],"exp_to_display":["( ( c & a ) => ( b <=> a ) )","( c & a )","( ( ( c & a ) => ( b <=> a ) ) | b )","( b <=> a )"],"indices":[1,6,2,4,5,0,3],"ptr":0},{"num_vars":4,"num_nodes":9,"x_coor":[0,0,0,0,0,0,1,1,1],"content":["|","|","|","|","|","a","b","c","d"],"y_coor":[0,1,2,3,4,5,1,2,5],"edge_carvature":[[0,0],[0,0],[0,3],[-2,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,6],[2,7],[3,5],[5,4],[5,8],[],[],[],[]],"exp_to_display":["( ( ( a | ( a | d ) ) | a ) | c )","( ( ( ( a | ( a | d ) ) | a ) | c ) | b )","( ( a | ( a | d ) ) | a )","( a | ( a | d ) )","( a | d )"],"indices":[1,5,0,6,2,7,8,3,4]}]	[[1,0,4],[1,0,5,2],[-1,-1,-1,-1],[-1,-1,-1,-1,-1]]	[{"correctResponse":[0,1,2],"wrongResponse":[]},{"correctResponse":[0,1,2,3],"wrongResponse":[]},{"correctResponse":[],"wrongResponse":[[0,1],[1,2],[2,0],[3,3]]},{"correctResponse":[],"wrongResponse":[[0,1],[1,0],[2,2],[3,3],[4,4]]}]	0.4375		\N	[["2022-01-31T09:47:20.483Z","2022-01-31T09:47:33.260Z"],["2022-01-31T09:47:33.260Z","2022-01-31T09:47:54.474Z"],["2022-01-31T09:47:54.474Z","2022-01-31T09:48:14.655Z"],[]]	2022-01-31 09:48:14.859924	6	3
8c93f69c-c995-4f21-a839-b08ada26c420	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,35,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46],[35,35,35,46,35,35,35,46],[35,46,46,46,46,35,35,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35,35,35],[35,46,35,35,35,46,35,35,35,35],[35,46,46,46,46,46,35,46,35,35],[35,46,35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46,46,46],[35,35,35,46,35,46,35,46,35,46],[35,35,35,46,35,46,46,46,46,46],[35,35,35,46,35,35,35,46,35,35]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":23,"score":"0.00"}	0.00		\N	[["2022-01-31T11:51:00.493Z","2022-01-31T11:51:30.971Z"],["2022-01-31T11:51:30.971Z","2022-01-31T11:51:33.805Z","2022-01-31T11:51:35.033Z","2022-01-31T11:51:35.813Z"],["2022-01-31T11:51:33.805Z","2022-01-31T11:51:35.033Z","2022-01-31T11:51:35.813Z","2022-01-31T12:02:41.320Z"]]	2022-01-31 12:02:41.575708	1	1
5eb41066-5990-43ee-8939-fd7fd7da3009	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,35,35,46,35,35]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,35,46,35,35],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46],[35,35,35,46,35,35,35,46],[35,46,46,46,46,35,35,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35,35,35],[35,46,35,35,35,46,35,35,35,35],[35,46,46,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,35,35,46],[35,46,46,46,46,46,46,46,35,46],[35,46,35,46,35,35,35,46,35,35],[35,35,46,46,46,46,46,46,35,35],[35,35,35,46,35,35,35,46,35,35],[35,35,35,46,46,46,46,46,35,35]]}]	[[{"node":65,"row":1,"col":2}],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":1,"totalMissed":23,"score":"0.00"}	0.00		\N	[["2022-01-31T15:10:16.868Z","2022-01-31T15:10:34.671Z"],[],[]]	2022-01-31 15:10:34.839707	1	3
06172967-0293-4393-8e62-94f65f18bdb5	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,35,35,46,35,35]],"nodes":[[2,1,65],[4,1,65],[1,1,68],[2,3,68],[1,5,68]],"shuffled_bag_ind":[[4,7],[3,7],[4,160],[3,32],[5,160],[4,59],[5,59],[4,174],[4,20],[3,59]],"shuffled_bag":["base","any","role","eat","throw","form","great","sign","cell","kid"]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,46],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46],[35,35,35,46,35,46,35,46],[35,46,46,46,46,35,35,35]],"nodes":[[1,1,65],[3,1,65],[5,1,65],[7,1,65],[1,1,68],[3,3,68],[1,5,68],[2,7,68]],"shuffled_bag_ind":[[7,42],[5,172],[5,77],[4,41],[7,89],[5,156],[7,50],[3,29],[4,187],[3,78],[6,76],[4,172],[3,113],[7,39],[4,77],[5,187],[6,155],[4,156],[3,59],[7,75]],"shuffled_bag":["forward","voice","legal","ever","project","think","imagine","did","such","off","itself","show","who","feeling","head","young","within","rise","kid","perform"]}]	[[[true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true]],[[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]]]	[{"result":[0,0,0,0,0],"tick_cross":[[0,0,0,0,1,0,1,0,0,0],[0,0,0,0,1,0,1,0,0,0],[1,0,1,0,0,1,0,1,1,0],[1,0,1,0,0,1,0,1,1,0],[1,0,1,0,0,1,0,1,1,0]]},{"result":[0,0,0,0,0,0,0,0],"tick_cross":[[0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0],[0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],[0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0]]}]	0		\N	[["2022-02-01T05:48:07.542Z","2022-02-01T05:48:13.657Z"],[]]	2022-02-01 05:48:13.608218	3	3
32359b52-bcfa-4cbd-bfba-63b63f13403f	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,35,46,35,46,35],[35,46,46,46,46,46],[35,35,46,35,46,35],[35,35,46,46,46,35]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,46,35,46,46,46,46,46],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,35,35],[35,35,35,35,35,46,35,35],[35,35,46,46,46,46,46,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,35,46,35,46,35,46,35,35,35],[35,35,46,35,46,46,46,46,46,46],[35,35,46,35,46,35,46,35,35,35],[35,35,35,35,46,46,46,46,46,46],[35,35,35,35,35,35,46,35,46,35],[35,35,35,35,35,35,46,46,46,46],[35,35,35,35,35,35,35,35,46,35],[35,35,35,35,35,35,35,46,46,46]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":22,"score":"0.00"}	0.00		\N	[["2022-02-01T13:48:27.272Z","2022-02-01T13:48:32.858Z"],[],[]]	2022-02-01 13:48:32.991184	1	3
79547c34-2e8a-4984-911e-6ffd20632249	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,35,46,35,46,35],[35,35,46,46,46,46],[35,35,46,35,46,35],[35,46,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,35,46,35,46,35,35,35],[35,35,46,46,46,46,46,46],[35,35,46,35,46,35,46,35],[35,35,35,46,46,46,46,35],[35,35,35,35,46,35,46,35],[35,35,46,46,46,46,35,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,35,46,35,46,35,35,35,35,35],[35,35,46,46,46,46,46,46,46,46],[35,35,46,35,46,35,46,35,35,35],[35,35,35,35,46,46,46,46,46,35],[35,35,35,35,46,35,46,35,46,35],[35,35,35,35,46,46,46,35,46,35],[35,35,35,35,46,35,35,35,46,35],[35,35,35,35,46,46,46,46,46,35]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":21,"score":"0.00"}	0.00		\N	[["2022-02-01T17:19:43.722Z","2022-02-01T17:19:49.502Z"],[],[]]	2022-02-01 17:19:49.683147	1	3
12c2fe32-0518-44e6-9699-b150d599e1d4	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,35,35],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,35,35],[35,46,35,46,35,46,35,35],[35,46,46,46,46,46,46,46],[35,46,35,46,35,35,35,46],[35,35,35,46,46,46,46,46],[35,35,35,46,35,35,35,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35,35,35],[35,46,35,35,35,46,35,35,35,46],[35,46,35,35,35,46,46,46,46,46],[35,46,35,35,35,46,35,46,35,46],[35,46,46,46,46,46,46,46,35,46],[35,46,35,46,35,35,35,46,35,35],[35,35,46,46,46,46,35,46,35,35],[35,35,35,46,35,35,35,46,35,35],[35,46,46,46,35,35,35,35,35,35]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":23,"score":"0.00"}	0.00		\N	[["2022-02-01T17:19:54.032Z","2022-02-01T17:20:00.122Z"],[],[]]	2022-02-01 17:20:00.280387	1	3
5676bd8d-fb12-49f5-8e8a-16ed37f3916c	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,35,35],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,35,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,35,35,46,46,46,46,46],[35,35,35,46,35,35,35,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,35,35,35,35,35],[35,46,35,35,35,46,35,35,35,35],[35,46,46,46,46,46,35,35,35,35],[35,46,35,46,35,46,35,35,35,46],[35,46,46,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,46,35,46],[35,35,35,46,46,46,46,46,46,46],[35,35,35,46,35,35,35,46,35,46],[35,35,35,46,46,46,46,46,46,46]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":23,"score":"0.00"}	0.00		\N	[["2022-02-01T17:21:39.785Z","2022-02-01T17:21:47.254Z"],[],[]]	2022-02-01 17:21:47.399778	1	3
0b5da783-b8bf-43ec-b444-5f7a09c8f510	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,46,35,46,35,46],[35,46,35,46,46,46],[35,46,35,35,35,46],[35,46,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,35,46,35,46,35,46,35],[35,35,46,35,46,46,46,46],[35,35,46,35,46,35,46,35],[35,46,46,46,46,35,46,35],[35,35,35,35,46,35,35,35],[35,35,35,35,46,46,46,46]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,46,35,35,35,46,35,35,35,35],[35,46,35,35,35,46,46,46,46,46],[35,46,35,35,35,46,35,46,35,46],[35,46,46,46,35,46,35,46,35,46],[35,35,35,46,35,46,35,35,35,46],[35,35,46,46,46,46,46,46,46,46],[35,35,35,46,35,35,35,35,35,46],[35,46,46,46,46,35,35,35,35,35]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":23,"score":"0.00"}	0.00		\N	[["2022-02-01T17:27:20.056Z","2022-02-01T17:27:28.269Z","2022-02-01T17:27:33.972Z","2022-02-01T17:27:53.524Z"],["2022-02-01T17:27:29.619Z","2022-02-01T17:27:33.972Z"],["2022-02-01T17:27:28.269Z","2022-02-01T17:27:29.619Z","2022-02-01T17:27:53.524Z","2022-02-01T17:28:00.778Z"]]	2022-02-01 17:28:02.902449	1	3
9284cdc9-0450-4fbe-aa00-d7d2f10d90fe	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,35,35,46],[35,46,46,46,35,46],[35,46,35,46,35,46],[35,46,46,46,35,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,35,35],[35,46,35,46,35,46,35,46],[35,35,35,46,46,46,46,46],[35,35,35,46,35,35,35,46]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,35,35,35,46,35,35,35,46],[35,46,46,46,46,46,46,46,46,46],[35,46,35,35,35,46,35,35,35,46],[35,46,46,46,46,46,46,46,35,35],[35,46,35,46,35,46,35,46,35,35],[35,46,46,46,46,46,46,46,35,35],[35,35,35,46,35,35,35,46,35,35],[35,35,35,46,46,46,46,46,35,35],[35,35,35,46,35,35,35,35,35,35]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":22,"score":"0.00"}	0.00		\N	[["2022-02-01T17:29:36.318Z","2022-02-01T17:29:39.214Z"],[],[]]	2022-02-01 17:29:39.447419	1	3
aa8f1471-116a-4243-8c9e-fa529a9ad2e5	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,35,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46]],"nodes":[[1,1,65],[3,3,65],[5,1,65],[1,1,68],[1,3,68],[1,5,68]],"ptr":3},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,35,46,35,46,35,35,35],[35,35,46,35,46,46,46,46],[35,35,46,35,46,35,46,35],[35,35,46,46,46,35,46,35],[35,35,35,35,46,35,46,35],[35,35,35,46,46,46,46,35]],"nodes":[[1,1,65],[3,4,65],[5,2,65],[7,3,65],[1,2,68],[1,4,68],[3,6,68]],"ptr":4},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,35,46,35,46,35,46,35,46,35],[35,35,46,35,46,46,46,46,46,46],[35,35,46,35,46,35,46,35,46,35],[35,35,46,46,46,46,46,46,35,35],[35,35,35,35,46,35,46,35,35,35],[35,35,35,35,46,46,46,46,35,35],[35,35,35,35,35,35,46,35,35,35],[35,35,35,35,35,46,46,46,46,35]],"nodes":[[1,1,65],[3,4,65],[5,2,65],[7,4,65],[9,5,65],[1,2,68],[1,4,68],[1,6,68],[2,8,68]],"ptr":5}]	[[],[],[[3,4,65,1,2,68]]]	[{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,1,68],[1,1,65,1,3,68],[1,1,65,1,5,68],[3,3,65,1,3,68],[3,3,65,1,5,68],[5,1,65,1,1,68],[5,1,65,1,3,68],[5,1,65,1,5,68]],"wrong_edges_list":[],"score":0,"totalCorrect":0,"totalWrong":1,"totalMissed":28},{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,2,68],[1,1,65,1,4,68],[3,4,65,1,4,68],[3,4,65,3,6,68],[5,2,65,1,2,68],[5,2,65,1,4,68],[7,3,65,1,4,68],[7,3,65,3,6,68]],"wrong_edges_list":[],"score":0,"totalCorrect":0,"totalWrong":1,"totalMissed":28},{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,2,68],[1,1,65,1,4,68],[1,1,65,1,6,68],[3,4,65,1,4,68],[3,4,65,1,6,68],[3,4,65,2,8,68],[5,2,65,1,2,68],[5,2,65,1,4,68],[5,2,65,1,6,68],[7,4,65,1,4,68],[7,4,65,1,6,68],[9,5,65,1,6,68]],"wrong_edges_list":[[3,4,65,1,2,68]],"score":0,"totalCorrect":0,"totalWrong":1,"totalMissed":28}]	0		\N	[["2022-02-01T17:30:51.105Z","2022-02-01T17:30:56.341Z"],[],["2022-02-01T17:30:56.341Z","2022-02-01T17:31:15.708Z"]]	2022-02-01 17:31:15.930867	2	1
6a179f6e-bdbe-400e-9d9c-9d256a33c096	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,46,35,46,35,46],[35,46,35,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]],"nodes":[[1,1,65],[3,3,65],[5,2,65],[1,1,68],[1,3,68],[2,5,68]],"ptr":3},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35],[35,35,46,35,46,35,46,35],[35,35,46,35,46,46,46,46],[35,35,46,35,46,35,35,35],[35,35,46,46,46,46,35,35],[35,35,35,35,46,35,35,35],[35,35,35,46,46,46,46,35]],"nodes":[[1,1,65],[3,4,65],[5,2,65],[7,3,65],[1,2,68],[1,4,68],[1,6,68]],"ptr":4},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,35,46,35,35,35,46,35,35,35],[35,35,46,35,35,46,46,46,46,46],[35,35,46,35,35,35,46,35,46,35],[35,46,46,46,46,46,46,46,46,35],[35,35,35,35,46,35,46,35,46,35],[35,35,35,35,46,46,46,46,35,35],[35,35,35,35,46,35,35,35,35,35],[35,35,35,35,46,46,46,46,35,35]],"nodes":[[1,1,65],[3,5,65],[5,1,65],[7,4,65],[9,4,65],[1,2,68],[5,4,68],[1,6,68],[3,8,68]],"ptr":5}]	[[],[],[]]	[{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,1,68],[1,1,65,1,3,68],[3,3,65,1,3,68],[3,3,65,2,5,68],[5,2,65,1,3,68],[5,2,65,2,5,68]],"wrong_edges_list":[],"score":0,"totalCorrect":0,"totalWrong":0,"totalMissed":25},{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,2,68],[1,1,65,1,4,68],[1,1,65,1,6,68],[3,4,65,1,4,68],[3,4,65,1,6,68],[5,2,65,1,2,68],[5,2,65,1,4,68],[7,3,65,1,4,68]],"wrong_edges_list":[],"score":0,"totalCorrect":0,"totalWrong":0,"totalMissed":25},{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,2,68],[1,1,65,1,6,68],[3,5,65,1,6,68],[3,5,65,3,8,68],[5,1,65,1,2,68],[5,1,65,5,4,68],[5,1,65,1,6,68],[5,1,65,3,8,68],[7,4,65,5,4,68],[7,4,65,1,6,68],[9,4,65,5,4,68]],"wrong_edges_list":[],"score":0,"totalCorrect":0,"totalWrong":0,"totalMissed":25}]	0		\N	[["2022-02-01T17:31:26.105Z","2022-02-01T17:31:29.828Z"],[],[]]	2022-02-01 17:31:30.051247	2	3
61407636-8d28-40b7-b1fa-ecb481a81484	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,35,35,46,35,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,35,35,46,46,46,46,46],[35,35,35,46,35,35,35,46]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35,35,35],[35,46,35,35,35,46,35,35,35,35],[35,46,46,46,46,46,35,35,35,35],[35,46,35,35,35,46,35,46,35,46],[35,46,46,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46,35,46],[35,35,35,46,35,46,46,46,46,46],[35,35,35,46,35,35,35,46,35,46],[35,35,35,46,46,46,46,46,35,46]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":22,"score":"0.00"}	0.00		\N	[["2022-02-01T17:31:41.784Z","2022-02-01T17:31:44.063Z"],[],[]]	2022-02-01 17:31:44.360102	1	3
1638bbc1-fab8-4b47-b13b-c49574d425a0	[{"num_vars":2,"num_nodes":4,"x_coor":[0,0,0,1],"content":["&","<=>","a","b"],"y_coor":[0,1,2,2],"edge_carvature":[[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,3],[2,3],[],[]],"expression":"( ( a <=> b ) & b )","values":[0,1,0,0]},{"num_vars":2,"num_nodes":6,"x_coor":[0,0,0,0,0,1],"content":["|","|","|","a","b","~"],"y_coor":[0,1,2,3,4,3],"edge_carvature":[[0,3],[0,3],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,3],[2,4],[3,5],[],[],[4]],"expression":"( ( ( a | ( ~ b ) ) | b ) | a )","values":[1,1,1,1,1,0]},{"num_vars":3,"num_nodes":7,"x_coor":[0,0,0,0,0,1,1],"content":["|","&","|","&","a","b","c"],"y_coor":[0,1,2,3,4,4,1],"edge_carvature":[[0,0],[0,3],[0,2],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,6],[2,4],[3,4],[4,5],[],[],[]],"expression":"( ( ( ( a & b ) | a ) & a ) | c )","values":[1,1,1,1,1,1,1]},{"num_vars":4,"num_nodes":11,"x_coor":[0,0,0,0,0,0,1,0,1,1,0],"content":["|","<=>","<=>","&","<=>","a","b","c","d","~","~"],"y_coor":[0,1,2,3,5,6,1,7,2,6,4],"edge_carvature":[[0,0],[0,0],[0,3],[-4,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,6],[2,8],[3,4],[7,10],[5,9],[],[],[],[],[7],[4]],"expression":"( ( ( ( c & ( ~ ( a <=> ( ~ c ) ) ) ) <=> ( a <=> ( ~ c ) ) ) <=> d ) | b )","values":[1,1,0,1,0,1,0,1,0,0,1]}]	[0,1,1,-1]	[{"answer":0,"score":1},{"answer":1,"score":1},{"answer":1,"score":1},{"answer":1,"score":0}]	0.75		\N	[["2022-02-02T07:37:27.127Z","2022-02-02T07:37:34.518Z"],["2022-02-02T07:37:34.518Z","2022-02-02T07:37:43.069Z"],["2022-02-02T07:37:43.069Z","2022-02-02T07:37:50.438Z"],["2022-02-02T07:37:50.438Z","2022-02-02T07:38:18.520Z"]]	2022-02-02 07:38:18.612901	5	3
9f13e132-4f21-4389-acce-604b98758a7c	[{"num_vars":2,"num_nodes":5,"x_coor":[0,0,0,0,1],"content":["<=>","&","a","b","~"],"y_coor":[0,1,2,3,2],"edge_carvature":[[0,2],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,2],[2,4],[],[],[3]],"exp_to_display":["( ( a & ( ~ b ) ) <=> a )","( a & ( ~ b ) )","( ~ b )"],"indices":[3,0,1,4,2],"ptr":0},{"num_vars":2,"num_nodes":6,"x_coor":[0,0,1,0,0,1],"content":["<=>","=>","<=>","a","b","~"],"y_coor":[0,1,1,2,3,2],"edge_carvature":[[0,0],[-2,0],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,2],[4,3],[3,5],[],[],[4]],"exp_to_display":["( ~ b )","( a <=> ( ~ b ) )","( b => a )","( ( b => a ) <=> ( a <=> ( ~ b ) ) )"],"indices":[3,5,2,1,4,0],"ptr":0},{"num_vars":3,"num_nodes":9,"x_coor":[0,0,0,0,0,1,1,1,1],"content":["<=>","|","|","=>","a","b","c","~","~"],"y_coor":[0,1,2,3,4,4,3,1,2],"edge_carvature":[[0,0],[0,3],[0,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,7],[2,4],[3,4],[4,5],[],[],[],[8],[6]],"exp_to_display":["( a => b )","( ( ( ( a => b ) | a ) | a ) <=> ( ~ ( ~ c ) ) )","( ~ c )","( ~ ( ~ c ) )","( ( a => b ) | a )","( ( ( a => b ) | a ) | a )"],"indices":[6,3,4,0,8,7,2,5,1]},{"num_vars":4,"num_nodes":11,"x_coor":[0,0,0,0,0,0,0,1,1,1,1],"content":["<=>","=>","=>","=>","<=>","a","b","c","d","~","~"],"y_coor":[0,1,2,3,4,5,6,4,1,3,5],"edge_carvature":[[0,0],[0,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,8],[2,3],[3,9],[7,4],[5,10],[],[],[],[],[4],[6]],"exp_to_display":["( ( ( ( c => ( a <=> ( ~ b ) ) ) => ( ~ ( a <=> ( ~ b ) ) ) ) => ( c => ( a <=> ( ~ b ) ) ) ) <=> d )","( ~ b )","( c => ( a <=> ( ~ b ) ) )","( a <=> ( ~ b ) )","( ~ ( a <=> ( ~ b ) ) )","( ( ( c => ( a <=> ( ~ b ) ) ) => ( ~ ( a <=> ( ~ b ) ) ) ) => ( c => ( a <=> ( ~ b ) ) ) )","( ( c => ( a <=> ( ~ b ) ) ) => ( ~ ( a <=> ( ~ b ) ) ) )"],"indices":[0,10,3,5,6,4,7,9,1,8,2]}]	[[1,2,3],[1,1,1,1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1]]	[{"correctResponse":[],"wrongResponse":[[0,0],[1,1],[2,4]]},{"correctResponse":[2],"wrongResponse":[[0,5],[1,2],[3,0]]},{"correctResponse":[],"wrongResponse":[[0,3],[1,0],[2,8],[3,7],[4,2],[5,1]]},{"correctResponse":[],"wrongResponse":[[0,0],[1,10],[2,3],[3,4],[4,9],[5,1],[6,2]]}]	0.05		\N	[["2022-02-04T06:11:09.237Z","2022-02-04T06:11:24.582Z","2022-02-04T06:11:49.039Z","2022-02-04T06:12:04.630Z"],["2022-02-04T06:11:24.582Z","2022-02-04T06:11:49.039Z"],[],[]]	2022-02-04 06:12:04.846437	6	11
a5acb4d8-aac2-41ad-9ea0-7f98180fc17f	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,35],[35,35,46,46,46,35]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46],[35,35,35,46,35,35,35,46],[35,35,46,46,46,46,35,46]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,46,35,35,35,46,35,35,35,46],[35,46,46,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,35,35,46],[35,46,46,46,46,46,46,46,35,46],[35,46,35,46,35,35,35,46,35,35],[35,35,35,46,35,35,46,46,46,46],[35,35,35,46,35,35,35,46,35,35],[35,35,46,46,46,46,35,46,35,35]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":24,"score":"0.00"}	0.00		\N	[["2022-02-08T03:49:50.878Z","2022-02-08T03:54:52.713Z"],[],[]]	2022-02-08 03:54:54.131815	1	18
107a0cae-d42a-428d-80db-7679e548e54e	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,35]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,35,46,35,46,35,46,35],[35,35,46,35,46,46,46,46],[35,35,46,35,46,35,46,35],[35,35,46,46,46,46,46,35],[35,35,35,35,46,35,35,35],[35,35,35,35,46,46,46,46]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,46,35,46,35,35,35,35,35,46],[35,46,35,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,35,35,46],[35,35,35,46,46,46,46,46,35,46],[35,35,35,35,35,46,35,46,35,46],[35,35,35,35,46,46,46,46,35,46],[35,35,35,35,35,35,35,46,35,46],[35,35,35,46,46,46,46,46,46,35]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":23,"score":"0.00"}	0.00		\N	[["2022-02-08T06:53:10.173Z","2022-02-08T06:58:12.371Z"],[],[]]	2022-02-08 06:58:14.362674	1	18
f57b1b1e-051f-4bbf-9d05-7710cf069dd9	[{"num_vars":2,"num_nodes":4,"values":{"a":0,"b":0},"x_coor":[0,0,0,1],"content":["=>","&","a","b"],"y_coor":[0,1,2,2],"edge_carvature":[[0,2],[0,0],[0,0],[0,0]],"adjList":[[1,2],[3,2],[],[]]},{"num_vars":2,"num_nodes":5,"values":{"a":0,"b":0},"x_coor":[0,0,0,0,1],"content":["=>","<=>","&","a","b"],"y_coor":[0,1,2,3,3],"edge_carvature":[[0,0],[0,2],[0,0],[0,0],[0,0]],"adjList":[[1,4],[2,3],[3,4],[],[]]},{"num_vars":3,"num_nodes":7,"values":{"a":1,"b":1,"c":1},"x_coor":[0,0,0,1,0,1,1],"content":["=>","&","=>","=>","a","b","c"],"y_coor":[0,1,2,1,3,3,2],"edge_carvature":[[0,0],[0,0],[0,0],[-2,0],[0,0],[0,0],[0,0]],"adjList":[[1,3],[2,6],[5,4],[5,4],[],[],[]]},{"num_vars":4,"num_nodes":10,"values":{"a":1,"b":1,"c":0,"d":0},"x_coor":[0,0,0,0,0,0,1,1,1,0],"content":["<=>","&","=>","|","<=>","a","b","c","d","~"],"y_coor":[0,1,2,3,5,6,6,1,2,4],"edge_carvature":[[0,0],[0,0],[-3,0],[-3,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"adjList":[[1,7],[2,8],[4,3],[5,9],[6,5],[],[],[],[],[4]]}]	["$$$","$$$","$$$","$$$"]	[{"syntax_error":"Invalid character at position : 1","correct":false,"score":0,"answer":"( ( b & a ) => a )"},{"syntax_error":"Invalid character at position : 1","correct":false,"score":0,"answer":"( ( ( a & b ) <=> a ) => b )"},{"syntax_error":"Invalid character at position : 1","correct":false,"score":0,"answer":"( ( ( b => a ) & c ) => ( b => a ) )"},{"syntax_error":"Invalid character at position : 1","correct":false,"score":0,"answer":"( ( ( ( b <=> a ) => ( a | ( ~ ( b <=> a ) ) ) ) & d ) <=> c )"},{"attempted":0,"notAttempted":4,"correctlyAnswered":0,"wrongAnswered":0,"score":0}]	0		\N	[["2022-02-08T09:42:04.177Z","2022-02-08T09:42:08.269Z"],[],[],[]]	2022-02-08 09:42:08.425268	7	3
ad96db1f-df40-41a0-b829-32ed4d61d4ab	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,35,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,35,46,35,46,35,35,35],[35,35,46,35,46,46,46,46],[35,35,35,35,46,35,46,35],[35,35,35,46,46,46,46,35],[35,35,35,35,35,35,46,35],[35,35,35,35,46,46,46,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,35,46,35,35,35,46,35,35,35],[35,35,46,35,35,46,46,46,46,46],[35,35,46,35,35,35,46,35,46,35],[35,35,46,46,46,46,46,46,46,35],[35,35,35,35,46,35,46,35,46,35],[35,35,35,35,46,46,46,46,46,35],[35,35,35,35,46,35,35,35,46,35],[35,35,46,46,46,46,46,35,46,35]]}]	[[{"node":65,"row":1,"col":1},{"node":65,"row":3,"col":3},{"node":65,"row":5,"col":2},{"node":68,"row":1,"col":1},{"node":68,"row":1,"col":3},{"row":1,"col":5,"node":68}],[{"node":65,"row":1,"col":1},{"node":65,"row":3,"col":3},{"node":65,"row":5,"col":3},{"node":65,"row":7,"col":4},{"node":68,"row":1,"col":2},{"node":68,"row":1,"col":4},{"node":68,"row":3,"col":6}],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":12,"totalWrong":1,"totalMissed":10,"score":"0.52"}	0.52		\N	[["2022-02-15T12:01:03.519Z","2022-02-15T12:03:00.933Z"],["2022-02-15T12:03:00.933Z","2022-02-15T12:04:38.439Z"],["2022-02-15T12:04:38.439Z","2022-02-15T12:06:05.102Z"]]	2022-02-15 12:06:07.477049	1	28
8209f3d0-09f5-417f-b259-9ebaebed0943	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,35,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,35,46,35,46,35,35,35],[35,35,46,35,46,46,46,46],[35,35,35,35,46,35,46,35],[35,35,35,46,46,46,46,35],[35,35,35,35,35,35,46,35],[35,35,35,35,46,46,46,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,35,46,35,35,35,46,35,35,35],[35,35,46,35,35,46,46,46,46,46],[35,35,46,35,35,35,46,35,46,35],[35,35,46,46,46,46,46,46,46,35],[35,35,35,35,46,35,46,35,46,35],[35,35,35,35,46,46,46,46,46,35],[35,35,35,35,46,35,35,35,46,35],[35,35,46,46,46,46,46,35,46,35]]}]	[[{"node":65,"row":1,"col":1},{"node":65,"row":3,"col":3},{"node":65,"row":5,"col":2},{"node":68,"row":1,"col":1},{"node":68,"row":1,"col":3},{"row":1,"col":5,"node":68}],[{"node":65,"row":1,"col":1},{"node":65,"row":3,"col":3},{"node":65,"row":5,"col":3},{"node":65,"row":7,"col":4},{"node":68,"row":1,"col":2},{"node":68,"row":1,"col":4},{"node":68,"row":3,"col":6}],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":12,"totalWrong":1,"totalMissed":10,"score":"0.52"}	0.52		\N	[["2022-02-15T12:01:03.519Z","2022-02-15T12:03:00.933Z"],["2022-02-15T12:03:00.933Z","2022-02-15T12:04:38.439Z"],["2022-02-15T12:04:38.439Z","2022-02-15T12:06:05.102Z","2022-02-15T12:06:23.019Z"]]	2022-02-15 12:06:23.549189	1	28
325eec67-9188-413b-adf4-56e446cb7f82	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46],[35,35,35,46,35,46,35,46],[35,35,46,46,46,46,35,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,46,35,35],[35,46,35,35,35,35,35,46,35,46],[35,46,46,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,46,35,46],[35,46,35,46,46,46,46,46,35,46],[35,35,35,46,35,46,35,35,35,35],[35,35,35,46,46,46,46,46,46,35],[35,35,35,46,35,35,35,35,35,35]]}]	[[{"node":65,"row":5,"col":2},{"node":68,"row":1,"col":3},{"node":65,"row":1,"col":1}],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":3,"totalWrong":0,"totalMissed":20,"score":"0.13"}	0.13		\N	[["2022-02-15T12:14:00.365Z","2022-02-15T12:14:53.137Z"],[],[]]	2022-02-15 12:14:55.928669	1	28
f9269516-a6c3-40cc-8faf-b9faa7bca934	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,35,35],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,35]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,35,35],[35,46,35,46,35,35,35,46],[35,46,46,46,46,46,46,46],[35,35,35,46,35,35,35,46],[35,35,46,46,46,46,35,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,46,35,35],[35,46,35,35,35,35,35,35,35,35],[35,46,46,46,35,35,35,35,35,35],[35,46,35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,46,35,46],[35,35,35,46,46,46,46,46,35,35],[35,35,35,46,35,46,35,46,35,35],[35,35,35,46,46,46,46,46,35,35]]}]	[[{"node":65,"row":1,"col":1},{"node":68,"row":1,"col":1}],[],[{"node":65,"row":5,"col":1},{"node":65,"row":1,"col":1},{"node":65,"row":3,"col":1},{"node":65,"row":7,"col":3},{"node":65,"row":9,"col":3},{"node":68,"row":1,"col":1},{"node":68,"row":3,"col":3},{"node":68,"row":4,"col":5},{"node":68,"row":4,"col":7},{"node":68,"row":4,"col":9}]]	{"attempted":4,"notAttempted":0,"totalCorrect":12,"totalWrong":0,"totalMissed":12,"score":"0.50"}	0.50		\N	[["2022-02-15T12:23:55.441Z","2022-02-15T12:24:24.674Z"],[],["2022-02-15T12:24:24.674Z","2022-02-15T12:26:50.487Z"]]	2022-02-15 12:26:53.325132	1	24
334a5d43-1a3f-4467-a026-d83fddbca3ae	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]],"nodes":[[2,5,68],[3,1,65]],"bag_size":8,"rebag":[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[8,32,49,77,28,27,15,46],[123,9,120,34,179,207,30,157],[123,9,120,34,179,29,156,144],[0,0,0,0,0,0,0,0]],"word_bag":[["move","best","miss","drug","some","trip","door","risk"],["seven","alone","score","coach","whole","civil","think","store"]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46],[35,35,35,46,35,35,35,46],[35,35,46,46,46,35,35,35]],"nodes":[[4,7,68],[5,1,65],[1,1,68]],"bag_size":15,"rebag":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[3,32,31,104,51,13,77,35,84,26,8,33,95,48,100],[3,160,31,104,51,13,77,35,84,154,8,33,95,136,49],[3,160,31,104,51,13,77,35,84,154,8,33,95,136,49],[3,30,103,50,12,76,34,83,153,7,32,94,135,48,100],[3,32,31,104,51,13,77,35,84,26,8,33,95,48,100],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"word_bag":[["ago","eat","dog","the","him","bag","nun","far","out","cut","are","end","set","hen","six"],["already","disease","discuss","service","improve","central","picture","exactly","problem","culture","benefit","economy","reality","hundred","respond"],["after","throw","class","piece","fight","argue","legal","color","might","these","allow","close","offer","sport","exist"]]}]	[[[true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true]],[[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]]]	[{"result":[0,0],"tick_cross":[[0,1,0,0,0,0,0,0],[0,1,1,0,1,0,0,1]]},{"result":[0,0,0],"tick_cross":[[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]]}]	0		\N	[["2022-02-17T09:49:57.213Z","2022-02-17T09:50:06.567Z"],[]]	2022-02-17 09:50:07.268148	4	28
ee0f45ff-c39c-4000-8a0d-c2a570b2110a	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,35,35,46],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,35,35,46,46,46,46,46],[35,35,35,46,35,46,35,35]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35,35,35],[35,46,35,35,35,46,46,46,46,46],[35,46,35,35,35,35,35,46,35,46],[35,46,46,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46,35,46],[35,35,35,46,35,46,35,46,35,35],[35,46,46,46,46,35,35,35,35,35],[35,35,35,46,35,35,35,35,35,35]]}]	[[{"node":65,"row":1,"col":1},{"node":68,"row":1,"col":1},{"node":65,"row":1,"col":3},{"node":65,"row":5,"col":2},{"node":68,"row":3,"col":3},{"node":68,"row":2,"col":5}],[{"node":68,"row":1,"col":1},{"node":65,"row":2,"col":1}],[{"node":68,"row":1,"col":1}]]	{"attempted":4,"notAttempted":0,"totalCorrect":8,"totalWrong":1,"totalMissed":14,"score":"0.34"}	0.34		\N	[["2022-02-21T09:52:40.715Z","2022-02-21T09:55:32.225Z"],["2022-02-21T09:55:32.225Z","2022-02-21T09:56:00.698Z"],["2022-02-21T09:56:00.698Z","2022-02-21T09:56:28.141Z"]]	2022-02-21 09:56:28.455525	1	26
d4312dc7-59a4-4368-aadc-3d4374115906	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,35,46,35,46,35],[35,35,46,46,46,46],[35,35,46,35,46,35],[35,46,46,46,35,35]],"nodes":[[1,1,65],[3,2,65],[5,1,65],[1,2,68],[1,4,68]],"ptr":3},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,35,35,46],[35,46,35,46,46,46,46,46],[35,46,35,46,35,46,35,46],[35,35,46,46,46,46,46,35],[35,35,35,35,35,46,35,35],[35,35,35,46,46,46,35,35]],"nodes":[[1,1,65],[3,3,65],[5,2,65],[7,3,65],[1,1,68],[1,3,68],[3,5,68],[1,7,68]],"ptr":4},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,46],[35,46,35,35,35,46,35,35,35,46],[35,46,35,35,46,46,46,46,46,46],[35,46,35,35,35,46,35,35,35,46],[35,46,46,46,46,46,46,46,35,46],[35,35,35,46,35,46,35,46,35,35],[35,35,35,46,46,46,46,46,46,35],[35,35,35,46,35,35,35,46,35,35],[35,35,46,46,46,46,46,46,35,35]],"nodes":[[1,1,65],[3,4,65],[5,1,65],[7,3,65],[9,2,65],[1,1,68],[5,3,68],[1,5,68],[5,7,68],[1,9,68]],"ptr":5}]	[[[1,1,65,1,4,68]],[],[]]	[{"allCorrect":false,"correct_edges_list":[[1,1,65,1,4,68]],"missed_edges_list":[[1,1,65,1,2,68],[3,2,65,1,2,68],[3,2,65,1,4,68],[5,1,65,1,2,68]],"wrong_edges_list":[],"score":0.038461538461538464,"totalCorrect":1,"totalWrong":0,"totalMissed":25},{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,1,68],[1,1,65,1,3,68],[3,3,65,1,3,68],[3,3,65,3,5,68],[3,3,65,1,7,68],[5,2,65,1,3,68],[5,2,65,3,5,68],[7,3,65,3,5,68]],"wrong_edges_list":[],"score":0.038461538461538464,"totalCorrect":1,"totalWrong":0,"totalMissed":25},{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,1,68],[1,1,65,1,5,68],[3,4,65,1,5,68],[3,4,65,1,9,68],[5,1,65,1,1,68],[5,1,65,5,3,68],[5,1,65,1,5,68],[5,1,65,5,7,68],[7,3,65,5,3,68],[7,3,65,1,5,68],[7,3,65,5,7,68],[9,2,65,5,3,68],[9,2,65,5,7,68]],"wrong_edges_list":[],"score":0.038461538461538464,"totalCorrect":1,"totalWrong":0,"totalMissed":25}]	0.038461538461538464		\N	[["2022-02-21T09:59:46.214Z","2022-02-21T09:59:56.139Z"],[],[]]	2022-02-21 09:59:56.498544	2	3
6ae31852-5d53-4e06-b4da-a53e5d82ed0d	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,35,46,35,46,35],[35,35,46,46,46,46],[35,35,46,35,46,35],[35,46,46,46,46,35]],"nodes":[[1,1,65],[3,2,65],[5,1,65],[1,2,68],[1,4,68]],"shuffled_bag_ind":[[4,184],[5,41],[3,95],[3,99],[3,55],[4,120],[3,41],[5,94],[5,119],[4,223],[4,42],[5,183]],"shuffled_bag":["stay","dream","set","sit","how","miss","get","occur","scene","west","face","worry"]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,46,35,46,46,46,46,46],[35,35,35,46,35,46,35,35],[35,35,46,46,46,46,35,35],[35,35,35,35,35,46,35,35],[35,35,35,46,46,46,46,35]],"nodes":[[1,1,65],[3,3,65],[5,2,65],[7,3,65],[1,1,68],[1,3,68],[1,5,68],[1,7,68]],"shuffled_bag_ind":[[3,32],[7,83],[4,0],[3,117],[4,160],[6,10],[6,27],[6,115],[3,85],[5,0],[4,213],[6,97],[7,115],[3,0],[5,117],[4,117],[5,160]],"shuffled_bag":["eat","private","also","yet","role","appear","center","recent","own","above","very","nearly","suggest","act","ready","meet","throw"]}]	[[[true,true,true,true,true,false,false,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true]],[[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]]]	[{"result":[0,0,0,0,0],"tick_cross":[[1,0,0,0,0,0,1,1,1,0,0,1],[1,0,0,0,0,1,0,0,0,1,1,0],[1,0,0,0,0,1,0,0,0,1,1,0],[0,1,0,0,0,0,0,1,1,0,0,1],[0,1,0,0,0,0,0,1,1,0,0,1]]},{"result":[0,0,0,0,0,0,0,0],"tick_cross":[[0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1],[0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0],[0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0],[1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1],[0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0]]}]	0		\N	[["2022-02-21T10:20:18.602Z","2022-02-21T10:20:47.468Z"],[]]	2022-02-21 10:20:48.159381	3	3
747759c6-1d85-4e84-9ccf-143b906ccba4	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,35,46],[35,46,35,46,35,46]],"nodes":[[2,3,68],[2,1,65]],"bag_size":8,"rebag":[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[13,115,86,6,2,37,20,44],[141,85,133,213,164,19,43,235],[141,85,133,163,18,42,99,157],[0,0,0,0,0,0,0,0]],"word_bag":[["part","hope","note","very","same","case","fact","yard"],["state","model","south","tough","blood","drive","owner","third"]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,46],[35,35,46,46,46,46,46,46],[35,35,35,46,35,35,35,35]],"nodes":[[2,5,68],[2,1,65],[4,1,65]],"bag_size":15,"rebag":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[101,50,41,53,61,64,71,96,7,109,116,10,29,113,45],[126,102,51,42,182,62,65,72,97,8,110,117,29,113,45],[126,102,51,42,182,62,65,72,97,8,110,117,29,113,45],[126,102,51,42,61,64,71,96,7,109,116,28,112,44,89],[126,102,51,42,54,62,65,72,97,8,110,117,11,30,114],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"word_bag":[["shoot","peace","fight","drive","world","guess","heavy","later","order","allow","prove","ready","civil","radio","enjoy"],["shoot","peace","fight","drive","world","guess","heavy","later","order","allow","prove","ready","civil","radio","enjoy"],["western","section","improve","forward","involve","mention","mission","partner","receive","benefit","special","surface","brother","develop","success"]]}]	[[[true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true]],[[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]]]	[{"result":[0,0],"tick_cross":[[0,0,1,0,0,0,0,0],[0,0,0,0,0,0,1,0]]},{"result":[0,0,0],"tick_cross":[[1,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,1,0,1,1,0,0,0,0,0,0],[0,1,1,1,0,1,1,0,1,0,1,1,0,0,0]]}]	0		\N	[["2022-02-21T11:10:06.521Z","2022-02-21T11:10:10.760Z"],[]]	2022-02-21 11:10:11.06534	4	3
e026b74d-4364-4ea6-a420-8d97cec90efe	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,35,35,46],[35,46,46,46,46,46]]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,35,46,35,46,35,46,35],[35,35,46,35,46,46,46,46],[35,35,46,35,46,35,46,35],[35,46,46,46,46,35,35,35],[35,35,35,35,46,35,35,35],[35,35,35,35,46,46,46,46]]},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,35,46,35,35,35,46,35,46,35],[35,35,46,35,35,46,46,46,46,46],[35,35,46,35,35,35,46,35,46,35],[35,46,46,46,46,46,46,46,35,35],[35,35,35,35,46,35,46,35,35,35],[35,35,35,46,46,46,46,46,46,46],[35,35,35,35,46,35,35,35,35,35],[35,35,46,46,46,35,35,35,35,35]]}]	[[],[],[]]	{"attempted":4,"notAttempted":0,"totalCorrect":0,"totalWrong":0,"totalMissed":22,"score":"0.00"}	0.00		\N	[["2022-02-24T08:00:30.673Z","2022-02-24T09:02:43.342Z"],[],[]]	2022-02-24 09:02:43.573244	1	1
470a4704-54a7-4033-a651-0ad14011529e	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]],"nodes":[[1,1,65],[3,1,65],[5,2,65],[1,1,68],[3,3,68],[1,5,68]],"ptr":3},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46],[35,35,35,46,35,35,35,46],[35,46,46,46,46,46,35,35]],"nodes":[[1,1,65],[3,1,65],[5,1,65],[7,1,65],[1,1,68],[3,3,68],[1,5,68],[3,7,68]],"ptr":4},{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,46,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35,35,46],[35,46,35,35,35,46,35,46,35,46],[35,46,46,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46,35,46],[35,35,35,46,35,46,46,46,46,46],[35,35,35,46,35,35,35,46,35,46],[35,35,35,46,35,46,46,46,46,46]],"nodes":[[1,1,65],[3,1,65],[5,1,65],[7,5,65],[9,5,65],[1,1,68],[5,3,68],[3,5,68],[4,7,68],[3,9,68]],"ptr":5}]	[[[3,1,65,1,1,68],[3,1,65,1,1,68]],[[3,1,65,3,3,68],[3,1,65,3,3,68]],[[1,1,65,1,1,68]]]	[{"allCorrect":false,"correct_edges_list":[[3,1,65,1,1,68]],"missed_edges_list":[[1,1,65,1,1,68],[1,1,65,1,5,68],[3,1,65,3,3,68],[3,1,65,1,5,68],[5,2,65,3,3,68],[5,2,65,1,5,68]],"wrong_edges_list":[[3,1,65,1,1,68]],"score":0.06896551724137931,"totalCorrect":3,"totalWrong":2,"totalMissed":26},{"allCorrect":false,"correct_edges_list":[[3,1,65,3,3,68]],"missed_edges_list":[[1,1,65,1,1,68],[1,1,65,1,5,68],[3,1,65,1,1,68],[3,1,65,1,5,68],[5,1,65,1,1,68],[5,1,65,3,3,68],[5,1,65,1,5,68],[5,1,65,3,7,68],[7,1,65,3,3,68]],"wrong_edges_list":[[3,1,65,3,3,68]],"score":0.06896551724137931,"totalCorrect":3,"totalWrong":2,"totalMissed":26},{"allCorrect":false,"correct_edges_list":[[1,1,65,1,1,68]],"missed_edges_list":[[3,1,65,1,1,68],[3,1,65,3,5,68],[5,1,65,1,1,68],[5,1,65,5,3,68],[5,1,65,3,5,68],[5,1,65,4,7,68],[7,5,65,3,5,68],[7,5,65,4,7,68],[7,5,65,3,9,68],[9,5,65,4,7,68],[9,5,65,3,9,68]],"wrong_edges_list":[],"score":0.06896551724137931,"totalCorrect":3,"totalWrong":2,"totalMissed":26}]	0.06896551724137931		\N	[["2022-02-26T03:48:25.258Z","2022-02-26T03:48:45.003Z","2022-02-26T03:48:46.063Z","2022-02-26T03:48:50.938Z"],["2022-02-26T03:48:45.003Z","2022-02-26T03:48:46.063Z","2022-02-26T03:48:50.938Z","2022-02-26T03:49:01.822Z","2022-02-26T03:49:04.035Z","2022-02-26T03:49:10.710Z"],["2022-02-26T03:49:01.822Z","2022-02-26T03:49:04.035Z","2022-02-26T03:49:10.710Z","2022-02-26T03:49:20.842Z"]]	2022-02-26 03:49:16.257252	2	26
9fd9a564-8951-4ad2-a81d-7ae5638cfcf5	[{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,35,46]],"nodes":[[1,1,65],[3,1,65],[5,1,65],[1,1,68],[1,3,68],[1,5,68]],"shuffled_bag_ind":[[4,53],[4,134],[3,105],[5,53],[3,67],[4,195],[3,3],[5,134],[3,53],[5,126],[5,125],[4,126],[3,6]],"shuffled_bag":["fire","once","too","first","man","term","ago","speak","hit","shoot","share","name","and"]},{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,35],[35,46,46,46,46,46,46,46],[35,46,35,46,35,35,35,46],[35,35,46,46,46,46,35,46],[35,35,35,46,35,35,35,46]],"nodes":[[2,1,65],[4,1,65],[6,2,65],[1,1,68],[4,3,68],[2,5,68],[4,7,68]],"shuffled_bag_ind":[[4,209],[7,101],[4,101],[5,84],[7,5],[6,101],[3,101],[6,73],[3,5],[7,85],[5,172],[5,101],[3,85],[7,81],[5,73],[4,5],[4,85],[6,4],[3,81],[5,4],[6,84]],"shuffled_bag":["turn","science","left","might","article","option","son","impact","all","process","voice","party","own","present","laugh","ball","hope","almost","old","again","market"]}]	[[[false,false,false,true,false,false,false,true,false,true,true,false,false],[false,false,false,true,false,false,false,true,false,true,true,false,false],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true]],[[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]]]	[{"result":[1,1,0,0,0,0],"tick_cross":[[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,1,0,1,0,1,0,1,0,0,0,1],[0,0,0,1,0,0,0,1,0,1,1,0,0],[0,0,0,1,0,0,0,1,0,1,1,0,0],[0,0,0,1,0,0,0,1,0,1,1,0,0]]},{"result":[0,0,0,0,0,0,0],"tick_cross":[[0,0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0],[0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0],[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0],[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0]]}]	0.15384615384615385		\N	[["2022-02-26T04:21:36.457Z","2022-02-26T04:22:46.368Z"],[]]	2022-02-26 04:22:42.064392	3	26
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1643536758195	Add1643536758195
2	1640337473703	CreateOneSeed1640337473703
3	1641659605083	Users1641659605083
4	1644136224675	AddedUserExperience1644136224675
5	1644168292223	AddedReport1644168292223
6	1645006574588	MarkingScheme1645006574588
7	1645857581501	HowToPlayUpdate1645857581501
\.


--
-- Data for Name: practicegamesdata; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.practicegamesdata (id, question_data, level, student_response, result, score, feedback, whatwentwrong, timespent, created_at, game_id, student_id, error) FROM stdin;
5c674359-8d38-48db-8563-7ba677ac9c19	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,35,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46]],"nodes":[[1,1,65],[3,3,65],[5,1,65],[1,1,68],[1,3,68],[1,5,68]],"shuffled_bag_ind":[[4,47],[3,38],[3,117],[5,47],[3,35],[5,33],[3,49],[5,164],[5,160],[4,160],[4,33],[5,1],[3,115],[4,164]],"shuffled_bag":["fear","for","yet","event","far","close","her","trade","throw","role","drop","admit","win","same"],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words with which you want to fill up the grid and initially all words are in the domain of all nodes. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    ","timeTaken":"01:11","level":"1","gameId":"3"}	1	[[false,false,true,true,false,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true,true]]	{"result":[0,0,0,0,0,0],"tick_cross":[[1,1,0,1,1,1,0,1,1,0,0,1,0,0],[0,1,1,0,1,0,1,0,0,0,0,0,1,0],[0,0,0,1,0,1,0,1,1,0,0,1,0,0],[0,0,0,1,0,1,0,1,1,0,0,1,0,0],[0,0,0,1,0,1,0,1,1,0,0,1,0,0],[0,0,0,1,0,1,0,1,1,0,0,1,0,0]]}	0.39285714285714285		\N	01:11	2022-01-31 14:52:11.389975	3	6	\N
6d58734f-dcdd-484a-b115-c22aaaa5d044	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,35,35,35],[35,46,46,46,35,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":0,"col":-2}]	{"allCorrect":false,"correct_nodes_list":[],"missed_nodes_list":[[1,1,65],[3,1,65],[5,1,65],[1,1,68],[1,3,68],[1,5,68]],"wrong_nodes_list":[[0,-2,65]]}	0		\N	00:16	2022-01-31 15:09:04.462022	1	3	\N
23ea58b2-88cf-4d0b-8797-b70c1f99f850	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,35,35,46,35,46]],"nodes":[[2,1,65],[4,1,65],[1,1,68],[2,3,68],[2,5,68]],"shuffled_bag_ind":[[4,50],[3,8],[4,136],[4,157],[4,18],[5,18],[3,18],[5,159],[5,136],[5,157],[3,29],[5,50],[4,159]],"shuffled_bag":["film","are","onto","risk","care","blood","box","three","sport","third","did","field","rock"],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words with which you want to fill up the grid and initially all words are in the domain of all nodes. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    ","timeTaken":"00:26","level":"1","gameId":"3"}	1	[[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true]]	{"result":[0,0,0,0,0],"tick_cross":[[0,0,0,0,0,1,0,1,1,1,0,1,0],[0,0,0,0,0,1,0,1,1,1,0,1,0],[1,0,1,1,1,0,0,0,0,0,0,0,1],[1,0,1,1,1,0,0,0,0,0,0,0,1],[1,0,1,1,1,0,0,0,0,0,0,0,1]]}	0.38461538461538464		\N	00:26	2022-02-01 05:48:00.251032	3	3	\N
e0c52d2f-951d-470d-8045-3e8a3b1cbb2b	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,35,46,35,46,35],[35,35,46,46,46,46],[35,35,46,35,46,35],[35,35,46,46,46,35]],"nodes":[[1,2,68],[1,1,65]],"bag_size":8,"rebag":[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[76,28,94,89,39,25,18,103],[204,156,94,89,126,40,154,147],[155,93,88,125,39,153,146,103],[0,0,0,0,0,0,0,0]],"word_bag":[["thing","north","mouth","share","crime","there","study","phone"],["time","rise","kill","into","name","even","rest","poor"]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words which are already node consistent for each node and you need to determine which words will remain in the domain of each node after enforcing arc consistency. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    ","timeTaken":"01:11","level":"1","gameId":"4"}	1	[[false,true,false,false,false,false,false,false],[false,false,false,true,false,false,false,false]]	{"result":[1,1],"tick_cross":[[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1]],"consistency_graph":[[[],[[1,3]],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]}	1	{"How interesting did you find the question?":5}	\N	01:11	2022-02-02 05:07:28.195206	4	3	\N
110bdc83-ff0e-44c4-b4da-d404cedbe948	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,35,35,46],[35,46,46,46,35,46],[35,46,35,46,35,35],[35,46,46,46,46,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":4,"col":4}]	{"allCorrect":false,"correct_nodes_list":[],"missed_nodes_list":[[1,1,65],[3,1,65],[5,1,65],[1,1,68],[3,3,68],[1,5,68]],"wrong_nodes_list":[[4,4,65]]}	0		\N	00:42	2022-02-04 06:04:12.816313	1	11	\N
15db7060-9d7f-485b-af13-785d4486be82	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,35,46],[35,35,35,46,35,35]],"nodes":[[2,1,65],[4,1,65],[1,1,68],[2,3,68],[1,5,68]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to draw the graph for the crossword. If two nodes are connected by an edge, you need to enter the two nodes from the drop-down list. To add an edge, press the “Add Edge” button. Press on the \\"Check Answer” button to get the result.","ptr":2,"timeTaken":"02:00","level":"1","gameId":"2"}	1	[[2,1,65,1,1,68]]	{"allCorrect":false,"correct_edges_list":[[2,1,65,1,1,68]],"missed_edges_list":[[2,1,65,2,3,68],[2,1,65,1,5,68],[4,1,65,1,1,68],[4,1,65,2,3,68]],"wrong_edges_list":[]}	0.2		\N	02:00	2022-02-04 06:07:05.988967	2	11	\N
73996928-befc-4d8b-9341-e2911590c6b8	{"expression":"( ( a | b ) => b )","num_vars":2,"num_nodes":4,"values":[1,1,0,1],"x_coor":[0,0,0,1],"content":["=>","|","a","b"],"y_coor":[0,1,2,2],"edge_carvature":[[0,0],[0,0],[0,0],[0,0]],"orderOfEvaluation":[2,3,1,0],"adjList":[[1,3],[2,3],[],[]],"attempt":1,"gameDescription":"This game is about evaluating the boolean expressions when the values of the variables have been provided. \\n    After Evaluating the expression, you need to enter the answer in the TextBox provided and Press the “Check Answer” button to Verify your Answer.\\n    The graph on the right shows how the expression can be modelled using a Directed Acyclic Graph. Note that Red edges denote left operand and Blue edges denote right operand. To visualize how the expression gets evaluated using a graph, press the “Visualize” button.\\n    ","ptr":4,"ptr2":0,"gameId":5}	1	-1	1	0		\N	00:31	2022-02-04 06:10:22.694395	5	11	\N
e18d7231-74e8-4ce5-96e7-5a2cb46cf75e	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,35,46,35,46,35],[35,35,46,46,46,46],[35,35,46,35,46,35],[35,46,46,46,46,46]],"attempt":2,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":1,"col":1},{"node":68,"row":1,"col":2}]	{"allCorrect":false,"correct_nodes_list":[[1,1,65],[1,2,68]],"missed_nodes_list":[[3,2,65],[5,1,65],[1,4,68]],"wrong_nodes_list":[]}	0.4		\N	00:11	2022-02-04 11:28:44.495919	1	3	\N
53ce7bca-4f11-4bbb-9483-b698433cc955	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46]],"nodes":[[1,1,65],[3,1,65],[5,1,65],[1,1,68],[1,3,68],[1,5,68]],"shuffled_bag_ind":[[5,86],[4,68],[4,87],[4,73],[5,67],[4,117],[3,73],[4,196],[3,68],[5,73],[5,116]],"shuffled_bag":["money","goal","huge","hand","house","meet","new","test","may","laugh","reach"],"attempt":2,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words with which you want to fill up the grid and initially all words are in the domain of all nodes. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    ","timeTaken":"00:04","level":"1","gameId":"3"}	1	[[true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true]]	{"result":[0,0,0,0,0,0],"tick_cross":[[1,0,0,0,1,0,0,0,0,1,1],[1,0,0,0,1,0,0,0,0,1,1],[1,0,0,0,1,0,0,0,0,1,1],[1,0,0,0,1,0,0,0,0,1,1],[1,0,0,0,1,0,0,0,0,1,1],[1,0,0,0,1,0,0,0,0,1,1]]}	0		\N	00:04	2022-02-06 17:34:26.512482	3	3	{"Question was wrong":true,"Provided solution was wrong":true}
9bc759f4-8232-4031-adcf-8bfd6d70e412	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]],"nodes":[[1,1,65],[3,1,65],[5,2,65],[1,1,68],[3,3,68],[2,5,68]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to draw the graph for the crossword. If two nodes are connected by an edge, you need to enter the two nodes from the drop-down list. To add an edge, press the “Add Edge” button. Press on the \\"Check Answer” button to get the result.","ptr":3,"timeTaken":"00:10","level":"1","gameId":"2"}	1	[[1,1,65,3,3,68]]	{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[1,1,65,1,1,68],[3,1,65,1,1,68],[3,1,65,3,3,68],[3,1,65,2,5,68],[5,2,65,3,3,68],[5,2,65,2,5,68]],"wrong_edges_list":[[1,1,65,3,3,68]]}	0		\N	00:10	2022-02-08 09:35:38.342306	2	3	{"Question was wrong":true}
e65dab6a-9c65-471b-97be-74d34019a7dd	{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,46,35,35,35,46,35,46],[35,46,46,46,46,46,46,46],[35,46,35,46,35,46,35,46],[35,46,46,46,46,46,35,46],[35,35,35,46,35,35,35,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	2	[{"node":68,"row":1,"col":1},{"node":68,"row":4,"col":3},{"node":68,"row":2,"col":5}]	{"allCorrect":false,"correct_nodes_list":[[1,1,68],[4,3,68],[2,5,68]],"missed_nodes_list":[[2,1,65],[4,1,65],[6,1,65],[3,7,68]],"wrong_nodes_list":[]}	0.42857142857142855	{"How interesting did you find the question?":3}	{"Silly mistake":true}	00:23	2022-02-12 12:04:31.98243	1	3	\N
be6b6966-8fd9-4ec9-9696-edae95630677	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,35,46],[35,35,35,46,35,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":68,"row":1,"col":1},{"node":65,"row":2,"col":1},{"node":65,"row":4,"col":1},{"node":68,"row":2,"col":3},{"node":65,"row":2,"col":5}]	{"allCorrect":false,"correct_nodes_list":[[2,1,65],[4,1,65],[1,1,68],[2,3,68]],"missed_nodes_list":[[2,5,68]],"wrong_nodes_list":[[2,5,65]]}	0.7	{"How interesting did you find the question?":4,"How relevant did you find the question w.r.t. the concept?":5,"How difficult did you find the question w.r.t. the current level?":4}	{"Attempted in a hurry":true,"Could not understand the question":true}	04:12	2022-02-14 15:51:43.404813	1	26	\N
44f172a8-6d4d-4e9f-a308-0a2ee4112181	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,35,35,46,35,35]],"nodes":[[2,1,65],[4,1,65],[1,1,68],[2,3,68],[2,5,68]],"shuffled_bag_ind":[[3,64],[3,118],[4,194],[5,173],[5,63],[5,91],[4,3],[3,47],[5,159],[5,2],[4,64],[3,66],[3,3]],"shuffled_bag":["lie","you","tend","watch","happy","never","baby","has","three","adult","fund","low","ago"],"attempt":3,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words with which you want to fill up the grid and initially all words are in the domain of all nodes. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    ","timeTaken":"01:38","level":"1","gameId":"3"}	1	[[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true]]	{"result":[0,0,0,0,0],"tick_cross":[[0,0,0,1,1,1,0,0,1,1,0,0,0],[0,0,0,1,1,1,0,0,1,1,0,0,0],[0,0,1,0,0,0,1,0,0,0,1,0,0],[0,0,1,0,0,0,1,0,0,0,1,0,0],[1,1,0,0,0,0,0,1,0,0,0,1,1]]}	0		\N	01:38	2022-02-08 09:49:45.422209	3	3	\N
979e00a7-366d-4e6e-bb37-dec1246b9f27	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,35,35],[35,35,35,46,35,35]],"nodes":[[2,1,65],[4,1,65],[1,1,68],[2,3,68],[1,5,68]],"shuffled_bag_ind":[[4,207],[4,215],[5,78],[3,53],[3,87],[4,53],[3,80],[5,169],[4,80],[5,53],[3,79]],"shuffled_bag":["trip","vote","level","hit","per","fire","oil","until","help","first","oft"],"attempt":4,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words with which you want to fill up the grid and initially all words are in the domain of all nodes. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    ","timeTaken":"00:41","level":"1","gameId":"3"}	1	[[true,true,false,true,true,true,true,false,false,false,true],[true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true]]	{"result":[0,0,0,0,0],"tick_cross":[[0,0,0,0,0,0,0,0,1,0,0],[0,0,0,1,1,0,1,0,0,0,1],[1,1,0,0,0,1,0,0,1,0,0],[1,1,0,0,0,1,0,0,1,0,0],[0,0,0,1,1,0,1,0,0,0,1]]}	0		\N	00:41	2022-02-08 09:54:29.222381	3	3	\N
c0e8ca32-435f-4681-9507-b86d1acb4973	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,35,35,46,35,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":-1,"col":2}]	{"allCorrect":false,"correct_nodes_list":[],"missed_nodes_list":[[2,1,65],[4,1,65],[1,1,68],[2,3,68],[1,5,68]],"wrong_nodes_list":[[-1,2,65]]}	0	{"How interesting did you find the question?":5,"How relevant did you find the question w.r.t. the concept?":5,"How difficult did you find the question w.r.t. the current level?":5}	{"Could not understand the question":true}	03:54	2022-02-08 11:32:39.919442	1	20	\N
86f726e6-5087-4dfc-be90-d730bab0d2b5	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,35],[35,46,46,46,35,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":1,"col":-2},{"node":68,"row":2,"col":-3}]	{"allCorrect":false,"correct_nodes_list":[],"missed_nodes_list":[[1,1,65],[3,1,65],[5,1,65],[1,1,68],[1,3,68],[1,5,68]],"wrong_nodes_list":[[1,-2,65],[2,-3,68]]}	0	{"How interesting did you find the question?":2,"How relevant did you find the question w.r.t. the concept?":4,"How difficult did you find the question w.r.t. the current level?":5}	{"Did not know the concept":true}	00:35	2022-02-08 10:36:41.244641	1	15	\N
eb536b18-45c8-47eb-930c-2bc8a9dba3bd	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,35,46],[35,46,35,46,35,46],[35,35,46,46,46,46]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":1,"col":1},{"node":68,"row":1,"col":2}]	{"allCorrect":false,"correct_nodes_list":[[1,1,65]],"missed_nodes_list":[[3,1,65],[5,2,65],[1,1,68],[1,3,68],[1,5,68]],"wrong_nodes_list":[[1,2,68]]}	0.08333333333333333		\N	01:36	2022-02-09 12:26:10.561196	1	24	\N
fb56a409-38af-4873-9557-c60f5f81df24	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":1,"col":1}]	{"allCorrect":false,"correct_nodes_list":[[1,1,65]],"missed_nodes_list":[[3,1,65],[5,1,65],[1,1,68],[3,3,68],[2,5,68]],"wrong_nodes_list":[]}	0.16666666666666666	{"How interesting did you find the question?":4,"How difficult did you find the question w.r.t. the current level?":3}	{"Did not know the concept":true}	00:11	2022-02-11 12:40:29.547518	1	2	\N
e7b4bb77-2278-4b9f-86c0-efed61d8800a	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,35,35,46],[35,46,46,46,35,46],[35,46,35,46,35,46],[35,46,46,46,35,46]],"attempt":2,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":1,"col":1},{"node":68,"row":1,"col":1},{"node":65,"row":3,"col":1}]	{"allCorrect":false,"correct_nodes_list":[[1,1,65],[3,1,65],[1,1,68]],"missed_nodes_list":[[5,1,65],[3,3,68],[1,5,68]],"wrong_nodes_list":[]}	0.5		\N	00:51	2022-02-14 15:54:51.482571	1	26	\N
bda38516-6017-46e0-8d2e-dc0054057b3b	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,35,35,46,35,35]],"nodes":[[2,1,65],[4,1,65],[1,1,68],[1,3,68],[1,5,68]],"shuffled_bag_ind":[[5,112],[4,58],[5,45],[5,94],[3,107],[4,116],[4,235],[5,58],[3,116],[3,113],[4,113],[3,58],[5,116]],"shuffled_bag":["quite","foot","enjoy","occur","try","mean","yard","glass","yes","who","main","key","reach"],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words with which you want to fill up the grid and initially all words are in the domain of all nodes. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    ","timeTaken":"11:13","level":"1","gameId":"3"}	1	[[true,true,true,false,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true],[true,false,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,false,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true,true]]	{"result":[0,0,0,0,0],"tick_cross":[[1,0,1,0,0,0,0,1,0,0,0,0,1],[1,0,1,1,0,0,0,1,0,0,0,0,1],[0,0,0,0,0,1,1,0,0,0,1,0,0],[1,0,1,1,0,0,0,0,0,0,0,0,1],[0,1,0,0,0,1,1,0,0,0,1,0,0]]}	0		\N	11:13	2022-02-17 09:32:13.3129	3	24	{"Provided solution was wrong":true,"Some part of question was not visible":true}
0966599c-15b5-49a7-be40-522fe214c5f6	{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,35,35,35],[35,46,35,35,35,46,35,35,35,35],[35,46,46,46,46,46,35,35,35,46],[35,46,35,35,35,46,35,35,35,46],[35,46,46,46,35,46,46,46,46,46],[35,46,35,46,35,35,35,35,35,46],[35,35,35,46,46,46,46,46,35,46],[35,35,35,46,35,35,35,46,35,35],[35,46,46,46,46,35,35,46,35,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	3	[{"node":65,"row":1,"col":1}]	{"allCorrect":false,"correct_nodes_list":[[1,1,65]],"missed_nodes_list":[[3,1,65],[5,1,65],[5,5,65],[7,3,65],[9,1,65],[1,1,68],[5,3,68],[1,5,68],[7,7,68],[3,9,68]],"wrong_nodes_list":[]}	0.09090909090909091		\N	00:05	2022-02-20 05:23:28.760761	1	3	\N
3d2cb8c9-eafe-438b-be4b-f22c94d13d6e	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,35,46,46,46],[35,35,35,46,35,46],[35,35,46,46,46,46]],"attempt":3,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	1	[{"node":65,"row":-1,"col":-1}]	{"allCorrect":false,"correct_nodes_list":[],"missed_nodes_list":[[1,1,65],[3,3,65],[5,2,65],[1,1,68],[1,3,68],[1,5,68]],"wrong_nodes_list":[[-1,-1,65]]}	0		\N	00:23	2022-02-21 09:48:36.949515	1	26	\N
f9d9ef4e-5fda-48e5-9cda-d9d8b987427e	{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,35],[35,35,46,35,46,35,35,35],[35,35,46,35,46,46,46,46],[35,35,46,35,46,35,46,35],[35,46,46,46,46,46,46,35],[35,35,35,35,46,35,35,35],[35,35,46,46,46,46,46,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	2	[{"node":65,"row":1,"col":1}]	{"allCorrect":false,"correct_nodes_list":[[1,1,65]],"missed_nodes_list":[[3,4,65],[5,1,65],[7,2,65],[1,2,68],[1,4,68],[3,6,68]],"wrong_nodes_list":[]}	0.14285714285714285		\N	00:15	2022-02-21 09:49:58.509402	1	26	\N
d94bdecf-2310-4b17-9014-74704c9ce4c0	{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,46,46,46,46,46,46,35,35],[35,35,46,35,46,35,46,35,46,35],[35,35,46,35,46,46,46,46,46,46],[35,35,46,35,46,35,46,35,46,35],[35,35,46,35,46,46,46,46,46,35],[35,35,46,35,46,35,46,35,35,35],[35,35,46,46,46,46,46,46,35,35],[35,35,35,35,46,35,35,35,35,35],[35,35,46,46,46,46,46,46,35,35]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to take your first step towards modelling it as a CSP. Find all positions in the crossword which are considered as Nodes and enter them by choosing Node direction, its row and column number. To add a node, press the “Add node” button. Press on the “Check Answer” button to get the result.\\n    ","gameId":"1"}	3	[{"node":65,"row":1,"col":1},{"node":65,"row":1,"col":1}]	{"allCorrect":false,"correct_nodes_list":[[1,1,65]],"missed_nodes_list":[[3,4,65],[5,4,65],[7,2,65],[9,2,65],[1,2,68],[1,4,68],[1,6,68],[2,8,68]],"wrong_nodes_list":[[1,1,65]]}	0.05555555555555555		\N	00:21	2022-02-21 09:50:53.848905	1	26	\N
82e22c56-2133-45e0-b393-74ab40151ed9	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,35,35],[35,46,35,46,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,35]],"nodes":[[1,1,65],[3,1,65],[5,1,65],[1,1,68],[1,3,68],[2,5,68]],"attempt":2,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to draw the graph for the crossword. If two nodes are connected by an edge, you need to enter the two nodes from the drop-down list. To add an edge, press the “Add Edge” button. Press on the \\"Check Answer” button to get the result.You get score = (correctEdgeCount - 0.5 * wrongEdgeCount) / (correctEdgeCount + missedEdgeCount)) and 0 if the quantity becomes negative.","ptr":3,"timeTaken":"00:08","level":"1","gameId":"2"}	1	[[1,1,65,1,1,68],[1,1,65,1,3,68]]	{"allCorrect":false,"correct_edges_list":[[1,1,65,1,1,68],[1,1,65,1,3,68]],"missed_edges_list":[[3,1,65,1,1,68],[3,1,65,1,3,68],[3,1,65,2,5,68],[5,1,65,1,1,68],[5,1,65,1,3,68]],"wrong_edges_list":[]}	0.2857142857142857	{"How interesting did you find the question?":2}	{"Silly mistake":true,"Did not know the concept":true}	00:08	2022-02-25 04:00:06.950385	2	3	\N
75fb36a8-7226-4489-97b0-7a56abbc7624	{"expression":"( ( b => a ) => a )","num_vars":2,"num_nodes":4,"values":[1,1,1,1],"x_coor":[0,0,0,1],"content":["=>","=>","a","b"],"y_coor":[0,1,2,2],"edge_carvature":[[0,2],[0,0],[0,0],[0,0]],"orderOfEvaluation":[3,2,1,0],"adjList":[[1,2],[3,2],[],[]],"attempt":1,"gameDescription":"This game is about evaluating the boolean expressions when the values of the variables have been provided. \\n    After Evaluating the expression, you need to enter the answer in the TextBox provided and Press the “Check Answer” button to Verify your Answer.\\n    The graph on the right shows how the expression can be modelled using a Directed Acyclic Graph. Note that Red edges denote left operand and Blue edges denote right operand. To visualize how the expression gets evaluated using a graph, press the “Visualize” button.\\n    You get score = 0 if you give wrong answer and 1 if you give correct answer.","ptr":0,"ptr2":0,"gameId":5}	1	1	1	1		\N	00:09	2022-02-25 04:04:34.879842	5	3	\N
d6015c3c-d044-48c2-8650-795e402892ec	{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,46,35,46,46,46,46,46],[35,46,35,46,35,46,35,46],[35,35,35,46,46,46,35,35],[35,35,35,35,35,46,35,35],[35,35,35,46,46,46,46,35]],"nodes":[[1,1,65],[3,3,65],[5,3,65],[7,3,65],[1,1,68],[1,3,68],[1,5,68],[1,7,68]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to draw the graph for the crossword. If two nodes are connected by an edge, you need to enter the two nodes from the drop-down list. To add an edge, press the “Add Edge” button. Press on the \\"Check Answer” button to get the result.You get score = (correctEdgeCount - 0.5 * wrongEdgeCount) / (correctEdgeCount + missedEdgeCount)) and 0 if the quantity becomes negative.","ptr":4,"timeTaken":"00:04","level":"2","gameId":"2"}	2	[[1,1,65,1,1,68]]	{"allCorrect":false,"correct_edges_list":[[1,1,65,1,1,68]],"missed_edges_list":[[1,1,65,1,3,68],[1,1,65,1,5,68],[3,3,65,1,3,68],[3,3,65,1,5,68],[3,3,65,1,7,68],[5,3,65,1,3,68],[5,3,65,1,5,68],[7,3,65,1,5,68]],"wrong_edges_list":[]}	0.1111111111111111		\N	00:04	2022-02-25 04:49:35.902455	2	3	\N
a86da684-61c9-4ff6-81f9-ae6d034b2a99	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,35,46,46,46,46]],"nodes":[[1,1,65],[3,1,65],[5,2,65],[1,1,68],[3,3,68],[2,5,68]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to draw the graph for the crossword. If two nodes are connected by an edge, you need to enter the two nodes from the drop-down list. To add an edge, press the “Add Edge” button. Press on the \\"Check Answer” button to get the result.You get score = (correctEdgeCount - 0.5 * wrongEdgeCount) / (correctEdgeCount + missedEdgeCount)) and 0 if the quantity becomes negative.","ptr":3,"timeTaken":"00:30","level":"1","gameId":"2"}	1	[[1,1,65,1,1,68]]	{"allCorrect":false,"correct_edges_list":[[1,1,65,1,1,68]],"missed_edges_list":[[3,1,65,1,1,68],[3,1,65,3,3,68],[3,1,65,2,5,68],[5,2,65,3,3,68],[5,2,65,2,5,68]],"wrong_edges_list":[]}	0.16666666666666666		\N	00:30	2022-02-26 03:45:32.69426	2	26	\N
66695e60-8bd8-4c20-bdae-a3a8161076b3	{"grid_size":7,"grid":[[35,35,35,35,35,35,35,35],[35,46,46,46,46,46,35,46],[35,46,35,46,35,46,35,46],[35,46,35,46,46,46,46,46],[35,46,35,46,35,46,35,35],[35,35,46,46,46,46,35,35],[35,35,35,35,35,46,35,35],[35,35,46,46,46,46,46,35]],"nodes":[[1,1,65],[3,3,65],[5,2,65],[7,2,65],[1,1,68],[1,3,68],[1,5,68],[1,7,68]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to draw the graph for the crossword. If two nodes are connected by an edge, you need to enter the two nodes from the drop-down list. To add an edge, press the “Add Edge” button. Press on the \\"Check Answer” button to get the result.You get score = (correctEdgeCount - 0.5 * wrongEdgeCount) / (correctEdgeCount + missedEdgeCount)) and 0 if the quantity becomes negative.","ptr":4,"timeTaken":"00:52","level":"2","gameId":"2"}	2	[[1,1,65,1,1,68],[1,1,65,1,5,68],[1,1,65,1,3,68],[5,2,65,1,3,68],[7,2,65,1,5,68]]	{"allCorrect":false,"correct_edges_list":[[1,1,65,1,1,68],[1,1,65,1,3,68],[1,1,65,1,5,68],[5,2,65,1,3,68],[7,2,65,1,5,68]],"missed_edges_list":[[3,3,65,1,3,68],[3,3,65,1,5,68],[3,3,65,1,7,68],[5,2,65,1,5,68]],"wrong_edges_list":[]}	0.5555555555555556		\N	00:52	2022-02-26 03:46:42.738948	2	26	\N
e953036c-26b0-4eb7-9f44-093040da7115	{"expression":"( ( b & a ) => a )","num_vars":2,"num_nodes":4,"values":[1,0,0,1],"x_coor":[0,0,0,1],"content":["=>","&","a","b"],"y_coor":[0,1,2,2],"edge_carvature":[[0,2],[0,0],[0,0],[0,0]],"orderOfEvaluation":[3,2,1,0],"adjList":[[1,2],[3,2],[],[]],"attempt":2,"gameDescription":"This game is about evaluating the boolean expressions when the values of the variables have been provided. \\n    After Evaluating the expression, you need to enter the answer in the TextBox provided and Press the “Check Answer” button to Verify your Answer.\\n    The graph on the right shows how the expression can be modelled using a Directed Acyclic Graph. Note that Red edges denote left operand and Blue edges denote right operand. To visualize how the expression gets evaluated using a graph, press the “Visualize” button.\\n    You get score = 0 if you give wrong answer and 1 if you give correct answer.","ptr":0,"ptr2":0,"gameId":5}	1	-1	1	0		\N	00:07	2022-02-26 14:55:49.131644	5	3	\N
79009287-a67c-4c6a-b1eb-664918bfca4c	{"expression":"( ( a <=> ( ~ b ) ) <=> b )","num_vars":2,"num_nodes":5,"values":[0,0,1,1,0],"x_coor":[0,0,0,0,1],"content":["<=>","<=>","a","b","~"],"y_coor":[0,1,2,3,2],"edge_carvature":[[0,3],[0,0],[0,0],[0,0],[0,0]],"orderOfEvaluation":[2,3,4,1,0],"adjList":[[1,3],[2,4],[],[],[3]],"attempt":3,"gameDescription":"This game is about evaluating the boolean expressions when the values of the variables have been provided. \\n    After Evaluating the expression, you need to enter the answer in the TextBox provided and Press the “Check Answer” button to Verify your Answer.\\n    The graph on the right shows how the expression can be modelled using a Directed Acyclic Graph. Note that Red edges denote left operand and Blue edges denote right operand. To visualize how the expression gets evaluated using a graph, press the “Visualize” button.\\n    You get score = 0 if you give wrong answer and 1 if you give correct answer.","ptr":0,"ptr2":0,"gameId":5}	1	-1	0	0		\N	00:04	2022-02-26 17:15:36.284518	5	3	\N
d6632b39-2945-4035-92cd-6cf79e1e9182	{"grid_size":9,"grid":[[35,35,35,35,35,35,35,35,35,35],[35,46,35,35,35,46,35,35,35,35],[35,46,46,46,46,46,35,35,35,46],[35,46,35,35,35,46,35,35,35,46],[35,46,35,35,35,46,46,46,46,46],[35,46,35,46,35,46,35,46,35,46],[35,46,46,46,46,46,46,46,35,35],[35,35,35,46,35,35,35,46,35,35],[35,35,46,46,46,46,35,35,35,35],[35,35,35,46,35,35,35,35,35,35]],"nodes":[[2,1,65],[4,5,65],[6,1,65],[8,2,65],[1,1,68],[5,3,68],[1,5,68],[4,7,68],[2,9,68]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number and you need to draw the graph for the crossword. If two nodes are connected by an edge, you need to enter the two nodes from the drop-down list. To add an edge, press the “Add Edge” button. Press on the \\"Check Answer” button to get the result.You get score = (correctEdgeCount - 0.5 * wrongEdgeCount) / (correctEdgeCount + missedEdgeCount)) and 0 if the quantity becomes negative.","ptr":4,"timeTaken":"00:09","level":"3","gameId":"2"}	3	[[4,5,65,5,3,68]]	{"allCorrect":false,"correct_edges_list":[],"missed_edges_list":[[2,1,65,1,1,68],[2,1,65,1,5,68],[4,5,65,1,5,68],[4,5,65,4,7,68],[4,5,65,2,9,68],[6,1,65,1,1,68],[6,1,65,5,3,68],[6,1,65,1,5,68],[6,1,65,4,7,68],[8,2,65,5,3,68]],"wrong_edges_list":[[4,5,65,5,3,68]]}	0		\N	00:09	2022-02-26 03:47:02.975564	2	26	\N
9b2a15d8-052b-4a56-bae3-18b8a5fc89b9	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,46,35],[35,46,35,46,35,46],[35,46,35,46,46,46],[35,46,35,35,35,46],[35,46,46,46,46,46]],"nodes":[[1,1,65],[3,3,65],[5,1,65],[1,1,68],[1,3,68],[2,5,68]],"shuffled_bag_ind":[[3,117],[4,6],[4,170],[5,170],[5,33],[5,143],[5,6],[3,6],[3,33],[5,117],[4,33],[4,117]],"shuffled_bag":["yet","bank","send","value","close","stock","agree","and","end","ready","drop","meet"],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words with which you want to fill up the grid and initially all words are in the domain of all nodes. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    You get score = (Number of nodes whose domains are made Node Consistent)/(Total number of nodes).","timeTaken":"02:06","level":"1","gameId":"3"}	1	[[true,false,false,true,true,true,true,true,true,true,false,false],[false,true,true,true,true,true,true,false,false,true,true,true],[true,true,true,false,false,false,false,true,true,false,true,true],[true,true,true,false,true,false,false,true,true,false,true,true],[false,true,true,true,true,true,true,false,false,true,true,true],[true,false,false,true,true,true,true,true,true,true,false,false]]	{"result":[0,0,0,0,0,0],"tick_cross":[[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]]}	0		\N	02:06	2022-02-26 03:56:00.403558	3	26	\N
be2fdf5d-7417-4586-b9b8-11b880f39a4e	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,35,46],[35,35,35,46,35,35]],"nodes":[[2,1,65],[1,1,68]],"bag_size":8,"rebag":[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[106,103,104,61,86,17,91,83],[234,231,104,189,86,17,219,211],[102,187,84,15,35,72,123,96],[0,0,0,0,0,0,0,0]],"word_bag":[["peace","young","might","batch","color","later","seven","often"],["work","wish","like","take","hour","card","want","unit"]],"attempt":1,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words which are already node consistent for each node and you need to determine which words will remain in the domain of each node after enforcing arc consistency. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    You get score = (Number of nodes whose domains are made Arc Consistent)/(Total number of nodes).","timeTaken":"00:34","level":"1","gameId":"4"}	1	[[true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true]]	{"result":[0,0],"tick_cross":[[0,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,0]],"consistency_graph":[[[],[],[],[],[],[],[],[[1,0],[1,4]]],[[],[],[],[],[],[],[],[]]]}	0		\N	00:34	2022-02-26 03:58:51.596627	4	26	\N
6f89a0bf-bd27-424f-a6a1-77597765a7c0	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,35,35,35,35],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,35,46],[35,35,35,46,35,46]],"nodes":[[2,1,65],[4,1,65],[1,1,68],[2,3,68],[2,5,68]],"shuffled_bag_ind":[[4,96],[4,111],[4,56],[3,0],[4,126],[3,110],[5,56],[5,110],[3,56],[4,110],[5,111],[5,126]],"shuffled_bag":["know","loss","five","act","name","war","force","prove","its","lose","quilt","shoot"],"attempt":2,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words with which you want to fill up the grid and initially all words are in the domain of all nodes. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    You get score = (Number of nodes whose domains are made Node Consistent)/(Total number of nodes).","timeTaken":"00:59","level":"1","gameId":"3"}	1	[[false,false,false,false,false,false,true,true,false,false,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true,true,true]]	{"result":[1,0,0,0,0],"tick_cross":[[1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,1,0,1,0,0,1,0,0,0],[1,1,1,0,1,0,0,0,0,1,0,0],[1,1,1,0,1,0,0,0,0,1,0,0],[1,1,1,0,1,0,0,0,0,1,0,0]]}	0.2		\N	00:59	2022-02-26 04:14:37.772583	3	26	\N
f14ad7c2-638c-4f53-859b-c7abb57c07dc	{"grid_size":5,"grid":[[35,35,35,35,35,35],[35,46,46,46,35,35],[35,46,35,35,35,46],[35,46,46,46,46,46],[35,46,35,46,35,46],[35,46,46,46,46,46]],"nodes":[[1,1,68],[1,1,65]],"bag_size":8,"rebag":[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[58,40,115,38,112,44,109,27],[186,40,37,170,107,25,65,81],[186,40,37,170,107,25,65,81],[0,0,0,0,0,0,0,0]],"word_bag":[["wrong","death","court","value","point","cause","heavy","major"],["key","gas","win","for","way","gun","use","dad"]],"attempt":2,"gameDescription":"In this game, you are given a crossword grid along with the row and column number. You have the set of words which are already node consistent for each node and you need to determine which words will remain in the domain of each node after enforcing arc consistency. Press on each word to include or exclude it from the domain of respective nodes. Blue color implies it is in the domain while Yellow color implies it is not in the domain. Press on the “Check Answer” button to get the result.\\n    You get score = (Number of nodes whose domains are made Arc Consistent)/(Total number of nodes).","timeTaken":"02:42","level":"1","gameId":"4"}	1	[[false,false,true,true,true,true,true,true],[true,true,true,true,false,true,true,false]]	{"result":[0,0],"tick_cross":[[0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0]],"consistency_graph":[[[[1,2],[1,4]],[[1,7]],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[]]]}	0		\N	02:42	2022-02-26 04:20:21.995256	4	26	\N
\.


--
-- Data for Name: practiceprogresstable; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.practiceprogresstable (id, levels_played, progress, game_id, student_id) FROM stdin;
826b1ef1-b589-4caa-9fa3-339770f7ea13	{t,f}	0.5	3	6
82c70b02-9dbd-4fa8-a3c5-f94fad5f5939	{t,f}	0.5	4	3
2254947a-f0b7-47d7-88fe-d747f9b8053b	{t,f,f}	0.3333333333333333	1	11
fd76a8c3-2d2f-4f17-9c4d-9c90a103747c	{t,f,f}	0.3333333333333333	2	11
e6f5ffb7-e8ed-4580-8aaf-b5c8d89ddd51	{t,f,f,f}	0.25	5	11
bb7f0d52-6daf-41bb-874d-7a2fdf8ca45c	{t,f}	0.5	3	3
79b50ace-8441-4532-83b2-4d9f27028dae	{t,f,f}	0.3333333333333333	1	15
fcb87fcc-0e99-446a-ae38-03647d431245	{t,f,f}	0.3333333333333333	1	20
c97d9e40-c899-41ed-83ef-fbd2181a0e43	{t,f,f}	0.3333333333333333	1	24
a557dd53-a5cf-4469-88e1-301b1a99b48d	{t,f,f}	0.3333333333333333	1	2
a7152463-b05b-4c7a-b49b-b8952fb2cb42	{t,f}	0.5	3	24
a33ddcf8-7089-4bbb-a4a6-bd5aacdeec30	{t,t,t}	1	1	3
20e0cdda-1943-45db-9cd6-fc5b53e1a50a	{t,t,t}	1	1	26
1ab5bbe8-f85a-44b4-ac91-60c9f8ab8a36	{t,t,f}	0.6666666666666666	2	3
f37d99d2-0490-497c-8156-4f3681ac3271	{t,t,t}	1	2	26
8c240ed4-5709-4fb2-93f0-8b45f247f0fc	{t,f}	0.5	3	26
b4dd5026-b5ae-4577-aa34-7afc863d6cbe	{t,f}	0.5	4	26
2604a52c-485f-44e8-8988-854a85aa9bd9	{t,f,f,f}	0.25	5	3
\.


--
-- Data for Name: querytable; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.querytable (id, name, email, who_are_you, query, created_at) FROM stdin;
1	Subhomoy Bakshi	subhomoy.bakshi@edudigm.in	Teacher	Check query flow.	2022-02-07 16:39:57.50264
2	a	a@a.co	Student	asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd	2022-02-14 16:13:33.54559
\.


--
-- Data for Name: readingmaterials; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.readingmaterials (id, content, concept_id) FROM stdin;
1	CSP or Constraint Satisfaction Problems as the name suggests tries to find a solution to a problem while satisfying given set of constraints.<new_line>We start with the problem where we are given a crossword grid (as shown below) and a bag of words.<image>crossword.png<image>We need to select subset of these words and place them on the crossword such that they fit together perfectly.<new_line>However, computers cannot simply see the crossword like human beings and solve the problem. We need some mathematical abstraction to represent the information which can then be solved by computer using appropriate algorithms. Here we use a graph having several nodes connected by edges to model the problem (as shown below)<image>graph.png<image>At the end, our CSP may have no solution, unique solution or multiple solution.	1
2	Suppose you are given the below crossword grid. The first step towards solving this CSP is finding nodes of the graph (denoted by circles in the image below). For a crossword, we consider all those positions as node from where a word starts.<image>crossword.png<image>graph.png<image><new_line><b>Example:</b><new_line>\t For the given crossword (1 - 2 - Across) is a node because a word can start from Row - 1, Column - 2 and goes in horizontal direction.<new_line>\tSimilarly we have (2 - 1 - Down) as a node.<new_line>\tAlso note that (1 - 4 - Across) is not a node because no word starts from that position.	1
3	Next step is detecting the edges of the graph (denoted by the straight lines connecting nodes in the image below). We connect two nodes of the graph by an edge if and only if the two nodes are constrained as per the description of given problem. For a crossword if an across node has a crossing with down node at some position, then they are definitely constrained because putting some word in the across node will constraint us in what we can put only those words in down node which have common letter at the crossing position.<image>crossword.png<image>graph.png<image><b>Exaample:</b><new_line>\tFor the given crossword, the node (1-2-Across) is connected with node (1-5-Down) because they intersect at (1-5).<new_line>\tAlso (4-2-Down) is connected with (6-1-Across) for similar reason.<new_line>\tOnce we find out all such edges, we get the graph corresponding to the crossword<new_line>Let us move on to games section for better practice.	1
4	Different types of constraints are:<new_line>i) Unary constraints or node constraints<new_line>ii) Binary constraints or edge between nodes<new_line>iii) Higher order or hyper-edge between nodes<new_line>In our current course, we will be looking into solving CSPs with Unary and Binary constraints only. Higher order constraints can be binarized in a simple way.<new_line><b>Examples:</b><new_line>\t"x1 can only be a 3-letter word" is a unary constraint because only one variable is involved<new_line>\t"3rd letter of word1 = 4th letter of word2" is a binary constraint because two variables are involved<new_line>\t"x1 + x2 > x3" is a higher order constraint because more than two variables are involved.<new_line><b>Self Assessment:</b><new_line>\tWhat type of constraint are the following:<new_line>\ti) gcd(x1,x2)=10<new_line>\tii) x1+5>2x1<new_line>\tiii) max(x1,x2)<max(x3,x4)<image>Answer:<new_line>\ti) is Binary because two variables are involved<new_line>\tii) is Unary because only one variables is involved<new_line>\tiii) is Higher order because more than two variables are involved	2
5	Let us understand what is node cosistency. Initially domain of each node of crossword contains set of all words present in our bag. But using Unary constraints (also called Node consistency), we can reduce its domain. For each variable Xᵢ, we can remove all elements from its domain Dᵢ that do not satisfy the unary constraints for the variable.<new_line><b>Self Assessment:</b><new_line>\ti) Let the domain of a variable in crossword be {BILL, CHILL, BOX, PACT, NODE}. If the unary constraint be that the variable can contain only 3-letter words, what is the reduced domain?<new_line>\tii) Let the domain of a variable in a linear equation be {12,16,20,65,10,46,78}. If the constraint be that all the variable's value must be divisible by 5 then what is the reduced domain?<image>Answer:<new_line>\ti) {BOX}<new_line>\tii) {20,65,10} 	2
7	Once we have reduced the domains sufficiently for each variable using node and arc consistency, we now need to try various assignment of values to each variable and check if it can be a solution to the CSP. Heuristic search is a search technique used in AI to produce solutions that may not be the optimal but are sufficiently good given a limited timeframe or deadline. We define some heuristic function h(n) which tells us which assignment of value to a variable should we consider first among the several alternatives that we have. <new_line><b>Example:</b><new_line>\tSuppose you have a set of points and their connections as shown below as you want to reach from "S" to "G" as soon as possible.<image>heuristic.png<image>\tOne algorithm can be to try out all paths and choose the shortest one.<new_line>\tHowever, this algorithm is too costly to complete execution within practical time limits.<new_line>\tInstead, we first compute some estimate of distance of "G" from each point.<new_line>\tSuppose it turned out to be h(S)=7, h(A)=9, h(B)=4, h(C)=2, h(D)=5, h(E)=3, h(G)=0.<new_line>\tFrom our current point we move to that point which is closest to "G".<new_line>\tYou may try yourself that the path thus taken will be S -> D -> E -> G<new_line>\tNote that this may not always lead to most optimal path.	3
8	Some commonly used heuristics are:<new_line>\ti) Minimum remaining values <new_line>\t\tVariable with fewest legal values (also known as most constrained variable) are assigned the value first<new_line>\tii) Degree heuristic<new_line>\t\tVariable with the largest number of constraints on other unassigned variables is assigned the value first<new_line>\tiii) Least constraining value<new_line>\t\tValue that leaves most choices for the neighboring variables in the constraint graph<new_line>\t\tThis heuristic is different from the first two heuristics<new_line>\t\tIt is a heuristic applied on what value from its domain must a variable take first rather than which variable to assign first.<new_line>We may also combine two or more of these heuristics to break ties.	3
9	Backtracking is a basic search methodology for solving CSP. <new_line>Basic steps of this algorithm are: <new_line>\t• Choose one of the variables which is not yet assigned its value.<new_line>\t• Assign some value to this variable based on its domain<new_line>\t• If no constraint is violated, then<new_line>\t\t• Assign value to next variable<new_line>\t• Else<new_line>\t\t• Don't assign value to any new variable.<new_line>\t\t• Instead, go back and try other values for previously assigned variables	4
10	A sentence that is either true or false is called a proposition. We might be able to conclude that a statement is definitely true or definitely false or it wil take true or false value depending on situation. However, the important thing is that such a statement cannot take any value other than true or false.<new_line><b>Examples:</b><new_line>\t"The sum of angles of triangle is 180⁰" is a proposition as it is true.<new_line>\t"2 + 3 = 7" is also a proposition as it is false.<new_line>\t"How are you?" is not a proposition because it cannot be said as true or false.<new_line><b>Self Assessment:</b><new_line>\tWhich of the following are proposition?<new_line>\ti) Square has 5 sides<new_line>\tii) Ram goes to school<new_line>\tiii) This sentence is false (Hint: Assume it is true or false and then check)<new_line>\tiv) What is your age?<image>Answer:<new_line>\ti) is proposition because it is always false<new_line>\tii) is proposition because it may be true or false depending on situation but doesn't take any other value<new_line>\tiii) is not a proposition because if you assume it to be true, the statement says itself to be false which is a contradiction. Similarly if you assume it to be false, there is a contradiction. So it is neither true nor false<new_line>\tiv) is not proposition because we cannot say that the statement is true or false.	5
11	An atom is a proposition that cannot be broken down into simpler propositions. A proposition that is not an atom but is constructed by connecting several atoms is called a compound proposition<new_line><b>Examples:</b><new_line>\t"Sun rises in the east" is an atom<new_line>\t"Sun rises in the east and sets in the west" is a compound proposition as it can be decomposed into 2 atoms seperated by "and"<new_line><b>Self Assessment:</b><new_line>\tClassify each of them as atoms or compound proposition?<new_line>\ti) I am learning AI<new_line>\tii) Quadratic equations have real solutions or have imaginary solutions<new_line>\tiii) I will go to school if it does not rain<image>Answer:<new_line>\ti) is atom because we cannot break the sentence into simpler proposition<new_line>\tii) is compound as it can be broken into "Quadratic equations have real solution" and "Quadratic equations have imaginary solution" connected by "or"<new_line>\tiii) is compound as it can be broken into "I will go to school" and "It does not rain" connected by "if"	5
12	In the study of propositional logic, we denote propositions with some symbol and connect them in appropriate ways to produce the required meaning. The symbols we use are called Boolean Variables and since they represent propositions, they can only take True (1) or False (0) as their value. By doing so, we can convert a sentence given in our language to a properly structured mathematical statement which will allow our computer to carry out automated reasoning.<new_line><b>Example:</b><new_line>\tSuppose the given sentence is "Sun rises in the east and sets in the west".<new_line>\tWe assign the boolean variables as P = "Sun rises in the east", Q = "Sun sets in the west".<new_line>\tIf we write the statement "P and Q", we get our original sentence written in symbolic form.<new_line>Note that there is no unique way to represent some sentence in terms of boolean variables. We are free to assign each boolean variable whatever meaning we want as long as the meaning of the overall statement remains same as original sentence.	5
13	Boolean operators operate on Boolean Variables to produce some output which can be '0' or '1'. They are also called connectives. If it operates on one variable, it is called Unary Operator and if it operates on two variables, it is called Binary Operator.	6
14	Various Boolean operators are:<new_line>i) NOT: denoted by (¬, ˜, !). Written as ¬P<new_line>ii) AND (or CONJUNCTION): denoted by (∧, . , &). Written as P ∧ Q<new_line>iii) OR (or DISJUNCTION): denoted by (∨, +, |). Written as P ∨ Q<new_line>iv) IMPLIES: denoted by (⇒, →, ⊃). Written as P ⇒ Q. Here P is called antecedent and Q is called consequent<new_line>v) BI-IMPLICATION(or BICONDITIONAL): denoted by (⇔, ≡, ↔). Written as P ⇔ Q.<new_line>Note that only  "¬" is unary while rest are binary operators<new_line>Meaning of each operator is discussed in "Semantics"<new_line><b>Self Assessment:</b><new_line>\tIdentify whether the usage of the operators are correct or not.<new_line>\ti) P ¬ Q<new_line>\tii) H ⇒ G<new_line>\tiii) ∧X<image>Answer:<new_line>\ti) This is not correct usage as "NOT" is unary operator and cannot operate on two variables<new_line>\tii) The operator is correctly used<new_line>\tiii) This is not correct usage because "AND" is binary operator but we are given only one operand	6
15	Now that we have Boolean variables as well as Boolean operators, we combine several Boolean variables and Boolean operators to form a Boolean or Logical expression. These Logical Expressions can represent the logic of our natural language sentences in a symbolic or abstract form. We can then interpret (or evaluate) the obtained expressions based on the meaning of the variables, their truth values ('1' or '0') and operators used to connect them. After evaluating, we obtain the truth value of the overall statement, i.e, whether it is true (1) or false (0). These can then be used to draw Logical inference or conclusions.	7
16	The syntax of propositional logic defines the grammar of the language and puts a restriction on which expressions are the acceptable sentences in this language. Such valid expressions are called well-formed formulas (WFF). We define the syntax of propositional logic in a recursive manner which goes as follow:<new_line>i) Every boolean variable by itself is a WFF.<new_line>ii) For any WFF P, ¬P is also a WFF.<new_line>iii) For any two WFFs P, Q, the following are also WFF:<new_line>\t(P ∧ Q)\t\t(P ∨ Q)<new_line>\t(P ⇒ Q)\t\t(P ⇔ Q)<new_line>iv) Any WFF may be enclosed inside parantheseis and they will still be WFF.<new_line><b>Self Assessment:</b><new_line>\tWhich of the following logical expressions follow proper syntax?<new_line>\ti) ((P ∧ Q) ⇒ A)<new_line>\tii) (¬(A ⇔ B)¬C)<new_line>\tiii) (A ⇒ P<image>Answer:<new_line>\ti) It follows proper syntax and does not violate any of the rules mentioned above<new_line>\tii) It does not follow proper syntax because there should have been some binary operator between "¬(A ⇔ B)" and "¬C" as given in 3rd point<new_line>\tiii) It does not follow proper syntax as the expression is not properly paranthesized	7
17	Having specified the syntax of propositional logic, we now specify its semantics. The semantics defines the rules for determining the truth value of a sentence. Let us define the meaning of each of the boolean operators:<new_line>i) NOT (¬, ˜, !): inverts the input, i.e, changes '1' to '0' and '0' to '1'.<new_line>\t<b>Example:</b><new_line>\t"Sun rises in the east". This is true statement. After applying NOT operator,it becomes Sun does not rise in the east which is false statement<new_line>ii) AND (∧, . , &): produces '1' as output only if both its inputs are '1', otherwise it is '0'.<new_line>\t<b>Examples:</b><new_line>\tSun rises in the east and sets in the west. Since both inputs are true, the overall statement is true. <new_line>\tSun rises in the east and sets in the east. Since second input is false, the overall statement is false<new_line>iii) OR (∨, +, |): produces '1' if atleast one of the inputs is '1'.<new_line>\t<b>Examples:</b><new_line>\tSun rises in the east or sets in the east. Since first input is true, the overall statement is true.<new_line>\tSun rises in the west or sets in the east. Since both inputs are false, the overall statement is false<new_line><b>Self Assessment:</b><new_line>\tSuppose you have the knowledge that Mr. X is principal of your school and you also know that he plays good cricket.<new_line>\tYour friend from same school tells you the following sentences:<new_line>\ti) Mr. X plays good cricket and he is not principal of our school<new_line>\tii) Mr. X does not play good cricket or he is principal of our school<new_line>\tDetermine whether he told you truth or he lied.<image>Answer:<new_line>\tLet P = Mr. X plays good cricket, Q = Mr. X is principal of your school. We know that P = 1, Q = 1<new_line>\ti) It can be written as (P & (~Q)) which evaluates to 0. So, he lied.<new_line>\tii) It can be written as ((~P) | Q) which evaluates to 1. So, he told truth.	8
18	In this material, we define the two other boolean operators. However, you should note that any boolean operation can always be written in terms of "NOT", "AND", "OR" operators. The definition of these operators goes as follows:<new_line>iv) IMPLIES (⇒, →, ⊃): produces '0' as output only when antecedent is '1' but consequent is '0' because in this case, the sense of implication no longer remains true. It is interpreted as "if.. then" construct, i.e, P ⇒ Q means "If P then Q". Interestingly, (P ⇒ Q) is logically equivalent to ((~P) | Q). You may put various values of P, Q and check if they evaluate to same value.<new_line>\t<b>Examples:</b><new_line>\t(1<2) ⇒ (2>1) is true because both antecedent and consequent are true<new_line>\t(1<2) ⇒ (2<1) is false because antecedent is '1' but consequent is '0'<new_line>\t(2<1) ⇒ (1<2) is true because antecendent itself is false<new_line>v) BI-IMPLICATION(⇔, ≡, ↔): produces '1' as output only when both inputs are same (or equivalent). It is interpreted as "same as" or "equivalent to" or "if and only if", i.e, P ⇔ Q is interpreted as "P is same as Q" or "P is equivalent to Q" or "P if and only if Q". (P ⇔ Q) is logically equivalent to ((P & Q) | ((~P) & (~Q)))<new_line>\t<b>Examples:</b><new_line>\t(1=2) ⇔ (2=1) is true because both the statements are equivalent<new_line>\t(1<2) ⇔ (2<1) is false because antecedent is true while consequent is false.<new_line><b>Self Assessment:</b><new_line>\tConsider that same Mr. X as in last reading material who was the principal of your school and also plays good cricket.<new_line>\tThat same friend again tells you some other statements and you need to determine whether he told truth or he lied.<new_line>\ti) Mr. X does not play good cricket if and only if he is principal of our school<new_line>\tii) Mr. X is not principal of our school if he plays good cricket.<image>Answer:<new_line>\tLet P = Mr. X plays good cricket, Q = Mr. X is principal of your school. We know that P = 1, Q = 1<new_line>\ti) It can be written as ((~P) ⇔ Q) which evaluates to 0. So, he lied.<new_line>\tii) It can be written as (P ⇒ (~Q)) which evaluates to 1. So, he told truth.	8
19	Now that we have learnt the syntax and semantics of propositional logic, we can evaluate logical expressions and determine its truth value ('1' or '0').<new_line>While evaluating any expression, we need to follow the operator precedence rules. The following list gives the operators from highest priority to lowest priority:<new_line>i) Brackets (), []<new_line>ii) NOT<new_line>iii) AND<new_line>iv) OR<new_line>v) IMPLIES<new_line>vi) BI-IMPLICATION<new_line><b>Example:</b><new_line>\tLet the expression be P ⇒ Q ∧ ¬R and values be P = 1, Q=1, R=0.<new_line>\tFirst we evaluate ¬R which is ¬(0) = 1 since it is place higher in the precedence list<new_line>\tNext we evaluate Q ∧ (¬R) = 1 ∧ 1 = 1.<new_line>\tNext we evaluate P ⇒ (Q ∧ (¬R)) = 1 ⇒ 1 = 1<new_line>\tIf you do not follow this precedence list, you may end up getting a wrong result.<new_line>In the initial stage, it is better to write fully paranthesized expressions like (P ⇒ (Q ∧ (¬R))) so that all subexpressions are enclosed within brackets	9
20	You might have got the question that how can we make our computer evaluate these logical expressions. Evaluating any expression requires the computer to follow a ordering of evaluation of subexpressions based on the precedence order as stated earlier. This idea of ordering can be implemented in a computer using a structure known as Directed Acyclic Graph (DAG) and then evaluated from sink nodes to source node. Sink nodes are those which do not have outgoing edges and source nodes are those which do not have incoming edges. The sink nodes denote the variables and each non-sink node represents an operator giving rise to some subexpression. If the represented operator is unary operator, it has one outgoing edge else it has 2 outgoing edges with one of them being left operand and the other one as right operand.<new_line><b>Example:</b><new_line>\tConsider the DAG shown below where red edge denotes left operand and blue edge denotes right operand.<image>DAG_example.png<image>\tThe sink nodes have the variables "a" and "b"<new_line>\tThe node having "|" connects them and denotes the expression "a | b".<new_line>\tThe source node having "=>" has its left operand as "a|b" and right operand as "b"<new_line>\tSo, it denotes the expression "((a | b) => b)<new_line>Let us move on to the games section to learn this concept while playing	9
6	Next step in the process of reduction of domain is done using the Binary constraints (also called Arc consistency). This step is more involved than Node consistency. The algorithm is as follows<new_line>Prepare a set of pairs of variables (Xᵢ,Xⱼ) if and only if Xᵢ and Xⱼ are connected by edges.<new_line>For each pair (Xᵢ,Xⱼ) present in the set, do:<new_line>\tRemove (Xᵢ,Xⱼ) from the set<new_line>\tRevise domain of Xᵢ to make it consistent with Xⱼ<new_line>\tIf there is any change in domain of Xᵢ, do:<new_line>\t\tInsert all pairs (Xₖ, Xᵢ) if they are connected by edge as these Xₖ might need revision<new_line>Continue this process till the set becomes empty<new_line>Refer to <a target="_blank" href="https://www.youtube.com/watch?v=4cCS8rrYT14&ab_channel=JohnLevine">this link</a> to see an example on how Arc consistency is done.	2
\.


--
-- Data for Name: readingmaterialsdata; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.readingmaterialsdata (id, read, timespent, timestamps, reading_material_id, student_id) FROM stdin;
4daff6f2-bd4d-40eb-86c3-e70f44a237cc	t	3.513,598.336,1.702,2.001	2022-01-30T10:02:44.890Z,2022-02-08T05:33:33.749Z,2022-02-13T05:47:39.634Z,2022-02-13T14:12:43.789Z	2	3
d4a1278c-4de3-4943-9f35-21f475af8edc	t	28.569	2022-01-31T05:07:43.764Z	14	4
108ace3f-7fec-4a2a-819d-b9dd801f1d97	t	7.934	2022-01-31T05:08:08.173Z	13	4
6c996f25-a36e-4157-8367-d235d902b42c	t	14.368	2022-01-31T06:16:24.064Z	1	4
fe94b1bb-a100-41a7-8acc-80db1cb939b7	t	1.903	2022-01-31T09:47:13.857Z	11	3
968bea33-6960-4521-ad35-28dda7b5fd7c	f	2.227	2022-01-31T14:22:16.496Z	3	6
6b9f8b75-6a88-465f-aa25-553127e6a61e	t	8.12	2022-01-31T14:49:42.602Z	9	6
c7f78e53-da6d-42b9-9524-1eced90013e8	f	13.863,4.121	2022-01-31T14:50:11.954Z,2022-01-31T14:52:59.784Z	4	6
988f0670-a6a4-44c5-b9e5-8a1f5e120b0a	f	2.836	2022-01-31T14:53:04.997Z	5	6
400085b3-699d-453a-a3f6-d045ea890a86	f	3.975	2022-01-31T14:53:11.609Z	6	6
709ffbd5-dd40-41b2-b89e-de33f028317a	t	83.194	2022-02-01T05:13:11.264Z	10	9
1798f160-7180-4180-8e8c-c99770a5d96f	t	1.724,3.444	2022-02-02T05:09:43.273Z,2022-02-13T14:12:48.908Z	3	3
e4ba9416-cb8a-4d61-aa52-182583e7ef49	t	2.709,9.302	2022-02-01T09:53:00.144Z,2022-02-02T05:04:57.065Z	1	3
0fbeb684-0aa3-486d-b92c-1f5c49475cd8	f	5.495	2022-02-17T09:43:41.430Z	9	28
23676f04-c874-4975-90b6-eac7467979d6	t	8.085,2.076	2022-01-31T06:34:29.094Z,2022-02-02T05:08:45.809Z	13	3
f781c77e-a824-4eff-872d-f97546f7a429	t	4.25	2022-02-02T05:08:58.342Z	15	3
a2432014-a2d8-4284-a31e-72fcf6fa91d2	t	9.838	2022-02-02T05:09:10.324Z	16	3
484fbe8d-4e27-4d36-85ca-61517751d14f	t	1.345,10.675,2.211	2022-02-02T05:08:49.244Z,2022-02-08T09:47:42.564Z,2022-02-13T14:18:58.869Z	14	3
0853ec44-6ec8-421f-8732-570d0f8f9c5e	t	65.329,1.406	2022-01-31T06:33:37.925Z,2022-02-02T05:09:22.356Z	7	3
dc51262c-c0b8-45a1-9703-f99b979772e8	t	103.77,2.018	2022-02-08T09:51:56.621Z,2022-02-13T14:19:23.999Z	4	3
ecb7a33d-4342-440e-ac66-0b74eb1ac102	t	7.817,1.132	2022-01-31T06:33:51.403Z,2022-02-02T05:09:25.414Z	8	3
8e7242bf-700b-40f8-861a-4a2b83fbfadf	f	74.401,2.51	2022-02-17T09:45:10.135Z,2022-02-17T09:46:21.116Z	19	28
63a9db3c-6e1c-426f-a568-29bb0a4fc0b9	t	72.203,1.88,3.602	2022-02-08T09:53:18.697Z,2022-02-13T14:13:45.836Z,2022-02-13T14:19:28.534Z	5	3
e35b796e-51f6-492b-846d-eacb856308ae	f	2.879	2022-02-17T09:46:28.421Z	10	28
43a399fa-ccfa-4683-ad19-bfc28e266c99	f	47.827	2022-02-04T06:03:23.967Z	1	11
75819c63-342a-4d0b-9b16-bbbad79f5d9b	f	7.227	2022-02-04T06:09:09.558Z	10	11
49d2c695-9e12-4dcf-97f4-8e70eaf7f230	f	3.78	2022-02-04T06:09:16.238Z	12	11
cd3b6059-627c-42d1-bde0-99756690a51a	t	20.051	2022-02-05T16:49:18.127Z	10	3
45f73308-58d0-4458-95dd-6025c3e99f6b	t	8.125,2.725,22.84,1.797,1.656	2022-01-31T06:36:07.766Z,2022-02-06T17:33:19.281Z,2022-02-08T09:53:44.459Z,2022-02-13T14:13:42.554Z,2022-02-13T14:19:33.369Z	6	3
7fcd93ed-0de1-41e1-86bf-c21a5e03dee4	t	2.516,1.211,1.745,1.565	2022-01-31T06:34:02.190Z,2022-02-02T05:09:33.746Z,2022-02-13T14:12:27.222Z,2022-02-13T14:19:40.862Z	9	3
a333e16a-451a-4984-a7f9-f211ea02bb23	t	1.503	2022-02-07T04:32:49.113Z	12	3
03ad157a-27ec-4e9c-ad35-9bf1d2dfe5b3	t	\N	\N	4	13
7897e6a9-c9e6-49d0-a8d5-5dfbad4e2953	t	12.313	2022-02-08T03:49:35.602Z	1	18
69c87526-42e1-4831-8796-cd63f1d499c6	f	2.786	2022-02-17T09:46:59.192Z	15	28
208866ca-3682-48f9-a77f-7180e00de72d	t	3802.33,23.484	2022-02-08T09:18:15.937Z,2022-02-08T09:19:05.050Z	1	15
af498f7f-aab1-4027-be9f-f6f26adb57a3	f	7.942,4.885,9.299	2022-02-17T09:47:11.627Z,2022-02-17T09:47:19.802Z,2022-02-17T09:47:32.067Z	18	28
8b1c5537-9574-4057-bed4-966d4fd99002	t	20.007,4236.765	2022-02-08T09:18:39.985Z,2022-02-08T10:29:44.426Z	2	15
a2f0d569-37df-4907-9f64-fa01c2001a68	t	372.816	2022-02-08T10:36:02.768Z	3	15
0adbfda9-e426-41c3-920f-2bdefec419ec	f	15.338	2022-02-08T10:36:19.925Z	1	20
98f17bd4-779b-43b0-8a8d-502fe8fab69a	t	2.593,39.259,43.296	2022-02-08T10:44:47.024Z,2022-02-08T11:25:19.838Z,2022-02-08T11:25:23.875Z	10	20
6fd9bf5d-4537-417f-8e0b-f8a3d04aa765	t	98.957	2022-02-08T11:27:14.774Z	11	20
aab4ec8d-74f4-41ea-a397-eaef260e31d7	t	\N	\N	12	20
62d2d757-72ec-4761-8784-f83edb79eb0f	t	15.498	2022-02-08T11:28:12.561Z	7	20
8520cfd3-9923-49ad-9676-b9c42a3c493a	t	5.163	2022-02-11T12:39:28.228Z	1	2
9a9e23a6-f0ad-4506-b51b-006e98b1af10	t	28.165,25.571,4.1,71.877	2022-02-26T03:53:17.132Z,2022-02-26T04:11:53.975Z,2022-02-26T04:12:07.532Z,2022-02-26T04:13:36.853Z	6	26
8a0ee67d-3096-4fc3-8021-6ba8858b51b9	t	117.106	2022-02-14T15:47:28.585Z	3	26
7a6526f4-0632-45b5-ba89-69d86a146d45	t	81.659,12.879	2022-02-14T15:43:25.377Z,2022-02-14T16:38:42.347Z	1	26
5f89b086-732f-4ac9-ac3c-b9880791ebd2	t	114.415,22.424	2022-02-14T15:45:25.863Z,2022-02-14T16:39:08.428Z	2	26
6f58549f-cdcf-4094-a11a-6bf98ed12df7	t	3.712,3.191,4.605	2022-02-17T09:47:56.728Z,2022-02-17T09:48:04.231Z,2022-02-17T09:49:04.478Z	16	28
2e7e1b71-e41b-4b8f-a73a-e184a084c146	t	21.921,10.071	2022-02-09T12:24:01.465Z,2022-02-15T12:34:04.012Z	1	24
bb1d24c4-9386-4d78-9064-1a6e4730fd74	t	3.403,4.15	2022-02-17T09:10:16.188Z,2022-02-17T09:10:24.542Z	7	28
9ebb5563-0134-4caf-b5b1-9c48787ab1a6	f	2.413	2022-02-17T09:10:47.559Z	7	24
6ac30215-5a95-4db2-a7e0-f4143a0e057f	f	3.426	2022-02-17T09:10:55.406Z	8	24
46168555-a598-47a1-9819-e34ace9273db	f	7.829,135.81	2022-02-11T06:26:41.960Z,2022-02-17T09:18:13.232Z	9	24
42e5d019-1cb8-4057-9ee1-42453b569edb	f	164.11,165.181	2022-02-17T09:43:19.456Z,2022-02-17T09:43:20.527Z	8	28
b05e11f8-4313-484f-a235-b2a28077ffeb	t	1.695	2022-02-20T14:50:40.199Z	19	3
5554e6f7-8fb9-44f4-81f1-b19acd0589d1	f	4.373	2022-02-21T12:42:06.265Z	10	26
f82239ef-5975-4b31-9df3-81c779ccc164	t	37.123	2022-02-26T03:50:43.404Z	4	26
ab42c660-377d-46d8-b966-79e44615f223	t	67.262,4.035	2022-02-26T03:51:53.672Z,2022-02-26T04:12:00.811Z	5	26
\.


--
-- Data for Name: readingprogresstable; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.readingprogresstable (id, is_read, reading_material_id, student_id) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.students (id, email, password, class, name, phone_number, organisation, role, language, created_at, updated_at, experience) FROM stdin;
4	ritesh.bhagat@edudigm.in	$2a$08$b5lpoBqOX0qlEXnH/MbchOJh7GSPkAnv2WgC4Y1vS1T0wfY4ImZYi	\N	Dieter Allen	\N	Edudigm	Others	en-US	2022-01-31 05:06:25.654349	2022-01-31 05:06:25.654349	[]
6	me.mayukhchatterjee@gmail.com	$2a$08$jE2cWRWFDT30CezRu/V26unVL300nOaQIgYGP5PcwPiqwoDqQ54my	\N	Mayukh Chatterjee	\N	own	Others	en-US	2022-01-31 14:19:41.087768	2022-01-31 14:19:41.087768	[]
9	saksharbanerjee20@gmail.com	$2a$08$Jo9XFMJwB2KLe.LnhQf05O7sY6rsuzp7sO5qfArkZQEaHyFw12fVK	12	Sakshar Banerjee 	\N	IIT KHARAGPUR 	Student	en-US	2022-02-01 05:05:07.332842	2022-02-01 05:05:07.332842	[]
11	chandranath.dhara@edudigm.in	$2a$08$r4gCYgJGxxo5UyxOcDZOsuRmGkY.Cq3RZPgMPsPq0.cToWRcnjh0O	\N	Chandranath Dhara	\N	EDUDIGM	Others	en-US	2022-02-04 06:00:08.307818	2022-02-04 06:00:08.307818	[]
1	prashant@gmail.com	$2a$08$ljKa3gfJmlotUYFoX4LAv.BOF2dpzIaoGkjY/kqjIa91HGwZQD4E.	7	Prashant Jangid	\N	\N	\N	en-US	2022-01-30 10:00:00.124008	2022-02-06 08:44:24.331467	[{"rating": 5}, {"rating": 5}]
13	digvijay.kaushal@edudigm.in	$2a$08$PYdmmCQ6qPRHoElOni/lXODl7mRzzIDbJ7nUywMuLddjBKGx/DgrO	6	Digvijay	\N	Dps megacity	Student	en-US	2022-02-07 16:55:38.53479	2022-02-07 16:55:38.53479	[]
18	dc.symbiantech@gmail.com	$2a$08$FnrodOmsuThDrZnUgsSLhOThLnHLvZyNVSBKLXR/k9gJhUWlvIneO	8	Debayan Chatterjee	\N	Edudigm	Student	en-US	2022-02-08 03:46:25.344688	2022-02-08 03:46:25.344688	[]
20	dipshikhadutta44@gmail.com	$2a$08$Y3ygUG/JQcwUnh7WR3wHGeRKhxaxhc611R9M.zJttT6U5WVtfFiLm	\N	Dipshikha Dutta	\N	Edudigm	Others	en-US	2022-02-08 10:26:13.827978	2022-02-08 10:26:13.827978	[]
15	adyasha.mishra@edudigm.in	$2a$08$.KkHSv3qv1UcPzAZvmV.4erRTVCHlshgLg3/oqLVTV2YURtiCeQRC	4	Adyasha Mishra	\N	Edudigm testing	Student	en-US	2022-02-08 03:22:29.940754	2022-02-08 10:38:58.957325	[]
22	contact@ai4schools.org	\N	\N	contact ai4schools	\N	\N	\N	en-US	2022-02-09 11:34:11.665775	2022-02-09 11:34:26.478452	[{"rating": 3}, {"rating": 3}]
23	bbiswabasuroy2001@gmail.com	\N	\N	Bbiswabasu Roy	\N	\N	\N	en-US	2022-02-09 11:34:59.13324	2022-02-09 11:34:59.13324	[]
25	prashantjangid876@gmail.com	\N	\N	pj 19	\N	\N	\N	en-US	2022-02-10 16:39:47.675008	2022-02-10 16:39:47.675008	[]
3	bbiswabasu@gmail.com	$2a$08$ocQN6a03tQ1CDOelm02pAuBZ/RDghd290lZhznIERqHDEoY0BDrli	7	Bbiswabasu Roy	awdaw	gdgdfgd	\N	en-US	2022-01-30 10:00:00.175877	2022-02-24 10:04:34.755141	[{"rating": 3}, {"rating": 3}, {"rating": 3}, {"rating": 3}, {"rating": 3}, {"rating": 3}, {"rating": 3}]
2	rajiv@gmail.com	$2a$08$UKMNhPl2h7YZwYcvQ/ofwuI12BhaHCGsKM7Qlt1zzAIzkS4yjAJri	7	Rajiv Aggarwal	\N	\N	\N	en-US	2022-01-30 10:00:00.15056	2022-02-11 12:41:20.33815	[{"rating": 5}]
26	rajiv.eesl@gmail.com	$2a$08$w8j.h6WeBKZ4O91Tk99GW.YovRU4J62lLgSIgGMtdfSWCFXPQYHJ2	7	Rajiv Agarwal	9051820275	St. Lawrence	Teacher	en-US	2022-02-14 15:34:54.283769	2022-02-26 04:07:55.63218	[{"rating": 4}, {"rating": 3}, {"rating": 5}, {"rating": 5}, {"rating": 5}]
28	soumya.patra@meddo.in	$2a$08$foXdx5S06Sgb0tlS6wYP0.WVjipt/spSq.3r4H4cB7YSLqUYG8A.C	10	Soumya Patra	\N	JNV	Student	en-US	2022-02-15 11:43:34.754834	2022-02-15 12:19:30.716865	[{"rating": 3}, {"rating": 3}]
24	soumyapatra9898@gmail.com	\N	6	soumya patra	988788	m,mb	\N	en-US	2022-02-09 12:23:03.7184	2022-02-17 09:20:24.055519	[{"rating": 3}, {"rating": 3}, {"rating": 3}, {"rating": 3}, {"rating": 3}]
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: developer
--

COPY public.topics (id, name, description) FROM stdin;
2	Propositional Logic	Propositional logic is used in AI for planning, problem-solving, intelligent control and most importantly for decision-making
1	Constraint Satisfaction Problem	Constraint Satisfaction Problems are such problems whose solutions must satisfy certain set of restrictions or constraints
\.


--
-- Name: concepts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: developer
--

SELECT pg_catalog.setval('public.concepts_id_seq', 9, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: developer
--

SELECT pg_catalog.setval('public.games_id_seq', 7, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: developer
--

SELECT pg_catalog.setval('public.migrations_id_seq', 7, true);


--
-- Name: querytable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: developer
--

SELECT pg_catalog.setval('public.querytable_id_seq', 2, true);


--
-- Name: readingmaterials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: developer
--

SELECT pg_catalog.setval('public.readingmaterials_id_seq', 20, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: developer
--

SELECT pg_catalog.setval('public.students_id_seq', 29, true);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: developer
--

SELECT pg_catalog.setval('public.topics_id_seq', 2, true);


--
-- Name: concepts PK_0026cb8bc253eab30b171606891; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.concepts
    ADD CONSTRAINT "PK_0026cb8bc253eab30b171606891" PRIMARY KEY (id);


--
-- Name: readingmaterials PK_02b4f8a848a8065fd5d38e6a68e; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingmaterials
    ADD CONSTRAINT "PK_02b4f8a848a8065fd5d38e6a68e" PRIMARY KEY (id);


--
-- Name: games_concepts_concepts PK_4254d1e18bc71305db4066ab447; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.games_concepts_concepts
    ADD CONSTRAINT "PK_4254d1e18bc71305db4066ab447" PRIMARY KEY (games_id, concepts_id);


--
-- Name: students PK_7d7f07271ad4ce999880713f05e; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: readingmaterialsdata PK_900f59ce3c3089c22b1af90aed7; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingmaterialsdata
    ADD CONSTRAINT "PK_900f59ce3c3089c22b1af90aed7" PRIMARY KEY (id);


--
-- Name: gradedgamesdata PK_92df0de4e78f11bda06e955706f; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.gradedgamesdata
    ADD CONSTRAINT "PK_92df0de4e78f11bda06e955706f" PRIMARY KEY (id);


--
-- Name: querytable PK_9d025505ed84a364a683b69e49e; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.querytable
    ADD CONSTRAINT "PK_9d025505ed84a364a683b69e49e" PRIMARY KEY (id);


--
-- Name: readingprogresstable PK_9e1ef7fdd318a71b5a6d9fad164; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingprogresstable
    ADD CONSTRAINT "PK_9e1ef7fdd318a71b5a6d9fad164" PRIMARY KEY (id);


--
-- Name: practicegamesdata PK_b9b575e074ae6072fbcb1e38f86; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.practicegamesdata
    ADD CONSTRAINT "PK_b9b575e074ae6072fbcb1e38f86" PRIMARY KEY (id);


--
-- Name: games PK_c9b16b62917b5595af982d66337; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY (id);


--
-- Name: practiceprogresstable PK_da146dfffa2bc9d0e4d7d76a5ca; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.practiceprogresstable
    ADD CONSTRAINT "PK_da146dfffa2bc9d0e4d7d76a5ca" PRIMARY KEY (id);


--
-- Name: topics PK_e4aa99a3fa60ec3a37d1fc4e853; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY (id);


--
-- Name: readingprogresstable REL_8c9a723e271aa7d3ab9088500a; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingprogresstable
    ADD CONSTRAINT "REL_8c9a723e271aa7d3ab9088500a" UNIQUE (student_id);


--
-- Name: readingprogresstable REL_8e35b7ebe1555c8721094216d7; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingprogresstable
    ADD CONSTRAINT "REL_8e35b7ebe1555c8721094216d7" UNIQUE (reading_material_id);


--
-- Name: students UQ_25985d58c714a4a427ced57507b; Type: CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE (email);


--
-- Name: IDX_1c9528930fadad9ad0bbd2ed76; Type: INDEX; Schema: public; Owner: developer
--

CREATE INDEX "IDX_1c9528930fadad9ad0bbd2ed76" ON public.games_concepts_concepts USING btree (games_id);


--
-- Name: IDX_5ddce73667cd4a8528e88ccbc7; Type: INDEX; Schema: public; Owner: developer
--

CREATE INDEX "IDX_5ddce73667cd4a8528e88ccbc7" ON public.games_concepts_concepts USING btree (concepts_id);


--
-- Name: gradedgamesdata FK_003c2316887b35b089f050cefff; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.gradedgamesdata
    ADD CONSTRAINT "FK_003c2316887b35b089f050cefff" FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: practicegamesdata FK_05a44aed62733cdbc09fc677301; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.practicegamesdata
    ADD CONSTRAINT "FK_05a44aed62733cdbc09fc677301" FOREIGN KEY (game_id) REFERENCES public.games(id);


--
-- Name: concepts FK_1b765c1d2ba0b50333244bd2838; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.concepts
    ADD CONSTRAINT "FK_1b765c1d2ba0b50333244bd2838" FOREIGN KEY (topic_id) REFERENCES public.topics(id);


--
-- Name: games_concepts_concepts FK_1c9528930fadad9ad0bbd2ed764; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.games_concepts_concepts
    ADD CONSTRAINT "FK_1c9528930fadad9ad0bbd2ed764" FOREIGN KEY (games_id) REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: games FK_284d9e477f4f977d91b246a93a7; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT "FK_284d9e477f4f977d91b246a93a7" FOREIGN KEY (major_concept_id) REFERENCES public.concepts(id);


--
-- Name: practicegamesdata FK_2a28b40c05b3771262451bcb8e3; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.practicegamesdata
    ADD CONSTRAINT "FK_2a28b40c05b3771262451bcb8e3" FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: games_concepts_concepts FK_5ddce73667cd4a8528e88ccbc77; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.games_concepts_concepts
    ADD CONSTRAINT "FK_5ddce73667cd4a8528e88ccbc77" FOREIGN KEY (concepts_id) REFERENCES public.concepts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: readingmaterials FK_80ddf3ac66dfdf019953d2773e6; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingmaterials
    ADD CONSTRAINT "FK_80ddf3ac66dfdf019953d2773e6" FOREIGN KEY (concept_id) REFERENCES public.concepts(id);


--
-- Name: readingprogresstable FK_8c9a723e271aa7d3ab9088500a3; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingprogresstable
    ADD CONSTRAINT "FK_8c9a723e271aa7d3ab9088500a3" FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: readingprogresstable FK_8e35b7ebe1555c8721094216d7f; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingprogresstable
    ADD CONSTRAINT "FK_8e35b7ebe1555c8721094216d7f" FOREIGN KEY (reading_material_id) REFERENCES public.readingmaterials(id);


--
-- Name: practiceprogresstable FK_992a2ac03037bea7089b3a1edfd; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.practiceprogresstable
    ADD CONSTRAINT "FK_992a2ac03037bea7089b3a1edfd" FOREIGN KEY (game_id) REFERENCES public.games(id);


--
-- Name: practiceprogresstable FK_a59d7b0f46397a50fde746b6d22; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.practiceprogresstable
    ADD CONSTRAINT "FK_a59d7b0f46397a50fde746b6d22" FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: gradedgamesdata FK_c3808f39766b250f30dc8f721cc; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.gradedgamesdata
    ADD CONSTRAINT "FK_c3808f39766b250f30dc8f721cc" FOREIGN KEY (game_id) REFERENCES public.games(id);


--
-- Name: readingmaterialsdata FK_e4f82a6443cbd11de20ac95f54d; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingmaterialsdata
    ADD CONSTRAINT "FK_e4f82a6443cbd11de20ac95f54d" FOREIGN KEY (reading_material_id) REFERENCES public.readingmaterials(id);


--
-- Name: readingmaterialsdata FK_f11c10274faa2a291ea46fa407c; Type: FK CONSTRAINT; Schema: public; Owner: developer
--

ALTER TABLE ONLY public.readingmaterialsdata
    ADD CONSTRAINT "FK_f11c10274faa2a291ea46fa407c" FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- PostgreSQL database dump complete
--

