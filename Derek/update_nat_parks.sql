-- update national_parks table park_code KCNP>>KICA, SEKI>>SEQU, GWA>>JEFF,NPAS>>NPSA
update national_parks set park_code = 'KICA' where park_code = 'KCNP';
update national_parks set park_code = 'SEQU' where park_code = 'SEKI';
update national_parks set park_code = 'JEFF' where park_code = 'GWA';
update national_parks set park_code = 'NPSA' where park_code = 'NPAS';

commit;

select park_name,park_code from national_parks where park_code in ('KICA','SEQU','JEFF','NPSA');



