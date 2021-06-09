INSERT INTO "kredit"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('kredit_seq'), 'Stambeni kredit', 'Dugorocni kredit', 'Dugorocni stambeni kredit za fizicko lice');
INSERT INTO "kredit"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('kredit_seq'), 'Potrosacki kredit', 'Kratkorocni kredit', 'Kratkorocni potrosacki kredit za fizicko lice');
INSERT INTO "kredit"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('kredit_seq'), 'Proizvodni kredit', 'Kratkorocni kredit', 'Kratkorocni proizvodni kredit za pravno lice');
INSERT INTO "kredit"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('kredit_seq'), 'Auto kredit', 'Kratkorocni kredit', 'Kratkorocni auto kredit za fizicko lice');
INSERT INTO "kredit"("id", "naziv", "oznaka", "opis")
VALUES (-100, 'Test kredit', 'test kredit', 'Test kredit za fizicko lice');

INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('tip_racuna_seq'), 'Devizni racun F', 'Pravno lice', 'Devizni racun za pravno lice');
INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('tip_racuna_seq'), 'Devizni racun P', 'Fizicko lice', 'Devizni racun za fizicko lice');
INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('tip_racuna_seq'), 'Namenski racun F', 'Fizicko lice', 'Namenski racun za fizicko lice');
INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('tip_racuna_seq'), 'Namenski racun P', 'Pravno lice', 'Namenski racun za pravno lice');
INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('tip_racuna_seq'), 'Stedni racun F', 'Fizicko lice', 'Stedni racun za fizicko lice');
INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('tip_racuna_seq'), 'Stedni racun P', 'Pravno lice', 'Stedni racun za pravno lice');
INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('tip_racuna_seq'), 'Ziro racun F', 'Fizicko lice', 'Ziro racun za fizicko lice');
INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (NEXTVAL('tip_racuna_seq'), 'Ziro racun P', 'Pravno lice', 'Ziro racun za pranvno lice');
INSERT INTO "tip_racuna"("id", "naziv", "oznaka", "opis")
VALUES (-100, 'Test racun', 'Fizicko lice', 'Test racun za fizicko lice');

INSERT INTO "klijent"("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (NEXTVAL('klijent_seq'), 'Dejo', 'Savicevic', 1234, 1);
INSERT INTO "klijent"("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (NEXTVAL('klijent_seq'), 'Dejan', 'Stankovic', 2345, 2);
INSERT INTO "klijent"("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (NEXTVAL('klijent_seq'), 'Zvezdan', 'Terzic', 4675, 4);
INSERT INTO "klijent"("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (NEXTVAL('klijent_seq'), 'Milan', 'Popovic', 23534, 4);
INSERT INTO "klijent"("id", "ime", "prezime", "broj_lk", "kredit")
VALUES (-100, 'test', 'test', 56565, 3);

INSERT INTO "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (NEXTVAL('racun_seq'), 'Racun za fizicko lice', 'Dinarski racun', 'Dinarski racun za fizicko lice', 8, 1);
INSERT INTO "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (NEXTVAL('racun_seq'), 'Racun za fizicko lice', 'Dinarski racun', 'Dinarski racun za fizicko lice', 5, 1);
INSERT INTO "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (NEXTVAL('racun_seq'), 'Racun za fizicko lice', 'Devizni racun', 'Devizni racun za fizicko lice', 1, 4);
INSERT INTO "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (NEXTVAL('racun_seq'), 'Racun za pravno lice', 'Dinarski racun', 'Dinarski racun za Pravno lice', 4, 2);
INSERT INTO "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
VALUES (-100, 'Test racun', 'Dinarski racun', 'Dinarski racun za Pravno lice', 4, 2);