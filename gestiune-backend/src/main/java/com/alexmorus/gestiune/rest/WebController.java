package com.alexmorus.gestiune.rest;

import com.alexmorus.gestiune.models.AngajatModel;
import com.alexmorus.gestiune.models.DistribuitorModel;
import com.alexmorus.gestiune.models.DocumenteProdusModel;
import com.alexmorus.gestiune.models.ProducatorModel;
import com.alexmorus.gestiune.models.ProdusModel;
import com.alexmorus.gestiune.models.UsersModel;
import io.swagger.annotations.Api;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author alexmorus
 */

@RestController
@RequestMapping("/api")
@Api(value="Endpoint pentru managementul depozitului")
@CrossOrigin(origins = "http://localhost:4200")
public class WebController {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    
    @GetMapping(value = "/login/{username}/{parola}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity verificareLogin(@PathVariable("username") String username, @PathVariable("parola") String parola) {
        String clasa = "unknown";
        
        String queryString = "SELECT parola, rang FROM users WHERE username = '";
        queryString += username + "'";
        
        Map<String, Object> result =  (Map<String, Object>) jdbcTemplate.queryForMap(queryString);
        
        System.out.println("result: " + result);
        
        String parolaCheck = result.get("parola").toString();
               
        
        if (parolaCheck.equals(parola)) {
            clasa = result.get("rang").toString();
        }
        
        System.out.println("Parola recuperata: " + parolaCheck);    
        System.out.println("Userul este " + clasa);
        
        return ResponseEntity.ok( clasa );
    }
    
    @GetMapping(value = "/register/{username}/{parola}/{email}/{rang}")
    public ResponseEntity creareUtilizator(@PathVariable("username") String username, @PathVariable("parola") String parola, @PathVariable("email") String email, @PathVariable("rang") String rang) { 
        
//        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS users(id serial PRIMARY KEY, username VARCHAR(30) UNIQUE NOT NULL, parola VARCHAR(25) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, rang VARCHAR(10) NOT NULL)");
                
        String queryString = "INSERT INTO users(username, parola, email, rang) VALUES";
        queryString += "('" + username + "', '" + parola + "', '" + email + "', '" + rang +"')";
        
        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping(value = "/users/delete/{id}")
    public ResponseEntity stergeUtilizator(@PathVariable("id") String id) { 
        
                
        String queryString = "delete from users where id = '" + id + "'";
        
        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping(value = "/users/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity listareUtilizatori() {
        
        List<UsersModel> users = new ArrayList<>();
        
        String queryString = "SELECT * FROM users";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(queryString);
        
        for (Map<String, Object> userSql : result ) {
            
            UsersModel user = new UsersModel();
            
            user.setId(userSql.get("id").toString());
            user.setUsername(userSql.get("username").toString());
            user.setEmail(userSql.get("email").toString());
            user.setRang(userSql.get("rang").toString());    
        
            users.add(user);
        }
        
        System.out.println("Rezultat query: " + result);
        System.out.println("Distribuitori: " + users);
        
        return ResponseEntity.ok( users );
        
    }
    
    @PostMapping(value = "/angajati/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity adaugareAngajat(@RequestBody AngajatModel angajat) {
        
        String queryString = null;
        
        if (angajat.getId() == null) {
            queryString = "INSERT INTO angajati(nume, adresa, oras, cnp, data_angajarii, durata_contract) VALUES ";
            queryString += "('" + angajat.getNume() + "', '" + angajat.getAdresa() + "', '" + angajat.getOras() + "', '" + angajat.getCnp()
                + "', '" + angajat.getData_angajarii() + "', '" + angajat.getDurata_contract() + "')";
        } else {
            queryString = "update angajati set nume ='" + angajat.getNume() + "', adresa = '" + angajat.getAdresa() + "', oras = '" 
                    + angajat.getOras() + "', data_angajarii = '" + angajat.getData_angajarii() + "', durata_contract = '" + angajat.getDurata_contract() 
                    + "' where cnp = '" + angajat.getCnp() + "'";
        }
        
        
        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping(value = "/angajati/delete/{cnp}")
    public ResponseEntity stergeAngajat(@PathVariable("cnp") String cnp) {
        
        String queryString = "delete from angajati where cnp = '" + cnp + "'";

        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();
    }
        
    @GetMapping(value = "/angajati/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity listareAngajati() {
        
        List<AngajatModel> angajati = new ArrayList<>();
        
        String queryString = "SELECT A.*, count(Pr.id) as nrProd\n" +
                    "FROM angajati A \n" +
                    "left join Produse Pr on A.id in (select app.id_angajat from angajati_preluare_produse app where app.id_produs = Pr.id)\n" +
                    "group by A.id"; // afisare nr produse preluate -> complexa

        List<Map<String, Object>> result = jdbcTemplate.queryForList(queryString);
        
        for (Map<String, Object> angajatSql : result ) {
            
            AngajatModel angajat = new AngajatModel();
            
            angajat.setId(angajatSql.get("id").toString());
            angajat.setAdresa(angajatSql.get("adresa").toString());
            angajat.setCnp(angajatSql.get("cnp").toString());
            angajat.setDurata_contract(angajatSql.get("durata_contract").toString());
            angajat.setNume(angajatSql.get("nume").toString());    
            angajat.setOras(angajatSql.get("oras").toString());
            angajat.setId(angajatSql.get("id").toString());
            angajat.setNrProdPreluate(angajatSql.get("nrprod").toString());

            String data = angajatSql.get("data_angajarii").toString();
            angajat.setData_angajarii( java.sql.Date.valueOf( data ).toLocalDate() );

            angajati.add(angajat);
        }
        
        System.out.println("Rezultat query: " + result);
        
        return ResponseEntity.ok( angajati );
    } 
    
    @PostMapping(value = "/distribuitori/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity adaugareDistribuitor(@RequestBody DistribuitorModel distribuitor) {
        
        String queryString = null;
        
        if (distribuitor.getId() == null) {
            queryString = "INSERT INTO distribuitori(denumire, adresa, oras, cui, valabilitate_contract) VALUES ";
            queryString += "('" + distribuitor.getDenumire() + "', '" + distribuitor.getAdresa() + "', '" + distribuitor.getOras() 
                    + "', '" + distribuitor.getCui() + "', '" + distribuitor.getValabilitateContract() + "')";
        } else {
            queryString = "UPDATE distribuitori set denumire = '" + distribuitor.getDenumire() + "', adresa = '" + distribuitor.getAdresa() 
                    + "', oras = '" + distribuitor.getOras() + "', valabilitate_contract = '" + distribuitor.getValabilitateContract() 
                    + "' where cui = '" + distribuitor.getCui() + "'";  
        } 
                
        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping(value = "/distribuitori/delete/{cui}")
    public ResponseEntity stergeDistribuitor(@PathVariable("cui") String cui) {
        
        String queryString = "delete from distribuitori where cui = '" + cui + "'";

        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping(value = "/distribuitori/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity listareDistribuitori() {
        
        List<DistribuitorModel> distribuitori = new ArrayList<>();
        
        String queryString = "SELECT D.*, count(Pr.id) as nrProd \n" +
                "FROM distribuitori D \n" +
                "left join Producatori Pr on D.id in (select Prod.id_distribuitor from produse Prod where Prod.id_producator = Pr.id)\n" +
                "group by D.id"; // afisare de la cati producator aduc produse -> complexa

        List<Map<String, Object>> result = jdbcTemplate.queryForList(queryString);
        
        for (Map<String, Object> distribuitorSql : result ) {
            
            DistribuitorModel distribuitor = new DistribuitorModel();
            
            distribuitor.setId(distribuitorSql.get("id").toString());
            distribuitor.setDenumire(distribuitorSql.get("denumire").toString());
            distribuitor.setAdresa(distribuitorSql.get("adresa").toString());
            distribuitor.setOras(distribuitorSql.get("oras").toString());
            distribuitor.setCui(distribuitorSql.get("cui").toString());    
            distribuitor.setValabilitateContract(distribuitorSql.get("valabilitate_contract").toString());
            distribuitor.setNrProd(distribuitorSql.get("nrprod").toString());
        
            distribuitori.add(distribuitor);
        }
        
        System.out.println("Rezultat query: " + result);
        System.out.println("Distribuitori: " + distribuitori);
        
        return ResponseEntity.ok( distribuitori );
    }
       
    @PostMapping(value = "/producatori/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity adaugareProducator(@RequestBody ProducatorModel producator) {
        
        String queryString = null;
        
        if (producator.getId() == null) {
            queryString = "INSERT INTO producatori(denumire, adresa, oras, cui) VALUES ";
            queryString += "('" + producator.getDenumire() + "', '" + producator.getAdresa() + "', '" 
                    + producator.getOras() + "', '" + producator.getCui() +  "')";
        } else {
            queryString = "UPDATE producatori set denumire = '" + producator.getDenumire() + "', adresa = '" + producator.getAdresa() 
                    + "', oras = '" + producator.getOras() + "' where cui = '" + producator.getCui() + "'";  
        } 
        
        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();    
    }
    
    @GetMapping(value = "/producatori/delete/{cui}")
    public ResponseEntity stergeProducator(@PathVariable("cui") String cui) {
        
        String queryString = "delete from producatori where cui = '" + cui + "'";

        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping(value = "/producatori/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity listareProducatori() {
        
        List<ProducatorModel> producatori = new ArrayList<>();
        
        String queryString = "SELECT P.*, count(Pr.id) as nrProd FROM producatori P "
                + "left join produse pr ON p.id = pr.id_producator group by P.id";
        // afisare cate modele diferite de produse de la ei sunt in stoc -> simpla

        List<Map<String, Object>> result = jdbcTemplate.queryForList(queryString);
        
        for (Map<String, Object> producatorSql : result ) {
            
            ProducatorModel producator = new ProducatorModel();
            
            producator.setId(producatorSql.get("id").toString());
            producator.setDenumire(producatorSql.get("denumire").toString());
            producator.setAdresa(producatorSql.get("adresa").toString());
            producator.setOras(producatorSql.get("oras").toString());
            producator.setCui(producatorSql.get("cui").toString());
            producator.setNrProd(producatorSql.get("nrprod").toString());
        
            producatori.add(producator);
        }
        
        System.out.println("Rezultat query: " + result);
        
        return ResponseEntity.ok( producatori );
    }
    
    @PostMapping(value = "/produse/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity adaugareProdus(@RequestBody ProdusModel produs) {
        
        String queryString = null;
        
        if (produs.getId() == null) {
            queryString = "INSERT INTO produse(model, descriere, pret, poza, stoc, id_producator, id_distribuitor) VALUES ";
            queryString += "('" + produs.getModel() + "', '" + produs.getDescriere() + "', '" + produs.getPret() + "', '" + produs.getPoza() 
                    + "', '" + produs.getStoc() + "', '" + produs.getProducator().getId() + "', '" + produs.getDistribuitor().getId() +  "')";
            
            jdbcTemplate.execute(queryString);

            // inserare in tabelul de legatura
            queryString = "insert into angajati_preluare_produse(id_angajat, id_produs, document_intrare, data_intrare) values ";
            queryString += "('" + produs.getIdAngajatPreluare() + "', (select id from produse where model = '" + produs.getModel() + "'), '" + produs.getDocumentIntrare() + "', '" + produs.getDataIntrare() + "')";
        } else {
            queryString = "UPDATE produse set model = '" + produs.getModel() + "', descriere = '" + produs.getDescriere() + "', pret = '" + produs.getPret() 
                    + "', poza = '" + produs.getPoza() + "', stoc = '" + produs.getStoc() +  "', id_producator = '" + produs.getProducator().getId() 
                    + "', id_distribuitor = '" + produs.getDistribuitor().getId() + "' where id = '" + produs.getId() + "'";  
        } 
        
        jdbcTemplate.execute(queryString);
        
        
        return ResponseEntity.ok().build();
        
    }
    
    @GetMapping(value = "/produse/delete/{id}")
    public ResponseEntity stergeProdus(@PathVariable("id") String id) {
        
        
        String queryString = "delete from angajati_preluare_produse where id_produs = '" + id + "' ;delete from produse where id = '" + id + "'";

        jdbcTemplate.execute(queryString);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping(value= "/documente/list")
    public ResponseEntity listareDocumenteProduse() {
        List<DocumenteProdusModel> documente = new ArrayList<>();
        
        String queryString = "select app.document_intrare, app.data_intrare, A.nume as numeAngajat, P.model as modelProdus from angajati_preluare_produse app\n" +
                "inner join Angajati A on A.id = app.id_angajat\n" +
                "inner join Produse P on P.id = app.id_produs"; // simpla

        List<Map<String, Object>> result = jdbcTemplate.queryForList(queryString);
        
        for (Map<String, Object> produsSql : result ) {
            
            DocumenteProdusModel document = new DocumenteProdusModel();
            
            document.setDocument(produsSql.get("document_intrare").toString());
            document.setNumeAngajat(produsSql.get("numeangajat").toString());
            document.setModelProdus(produsSql.get("modelprodus").toString());
            
            String data = produsSql.get("data_intrare").toString();
            document.setData( java.sql.Date.valueOf( data ).toLocalDate() );
            
            documente.add(document);
        }
        
        System.out.println("Rezultat query: " + result);
        
        return ResponseEntity.ok( documente );
    }
    
    private ResponseEntity listareProduse() {
     
        List<ProdusModel> produse = new ArrayList<>();
        
        String queryString = "SELECT P.id, P.model, P.descriere, P.pret, P.poza, P.stoc, Pr.denumire as denprod, D.denumire as dendis "
                + "FROM produse P inner join Producatori Pr on P.id_producator = Pr.id "
                + "inner join Distribuitori D on P.id_distribuitor = D.id;"; // -> simpla

        List<Map<String, Object>> result = jdbcTemplate.queryForList(queryString);
        
        for (Map<String, Object> produsSql : result ) {
            
            ProdusModel produs = new ProdusModel();
            
            produs.setId(produsSql.get("id").toString());
            produs.setModel(produsSql.get("model").toString());
            produs.setDescriere(produsSql.get("descriere").toString());
            produs.setPret(produsSql.get("pret").toString());
            produs.setPoza(produsSql.get("poza").toString());    
            produs.setStoc(produsSql.get("stoc").toString());
            produs.setDenumireProducator(produsSql.get("denprod").toString());
            produs.setDenumireDistribuitor(produsSql.get("dendis").toString());

            produse.add(produs);
        }
        
        System.out.println("Rezultat query: " + result);
        
        return ResponseEntity.ok( produse );
    }
    
    
    
    
    @GetMapping(value = "/produse/list/filter/{parametru}/{valoare}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity listareProduseDupa(@PathVariable("parametru") String parametru, @PathVariable("valoare") String valoare) {
                
        if (parametru.equals("null") && valoare.equals("null")) {
            return this.listareProduse();
        }
                
        String queryString = null;
        
        List<ProdusModel> produse = new ArrayList<>();
        
        if (parametru.toLowerCase().equals("angajat")) { // -> complexa; produse preluate de angajatul cu numele ...
            queryString = "select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P\n" +
                "inner join Producatori Pr on P.id_producator = Pr.id \n" +
                "inner join Distribuitori D on P.id_distribuitor = D.id\n" +
                "inner join angajati a\n" +
                "on a.id in (select app.id_angajat from angajati_preluare_produse app where app.id_produs = p.id and a.nume = '" + valoare + "')\n" +
                "group by p.id, a.id, d.denumire, pr.denumire";
        }
        
        if (parametru.toLowerCase().equals("after")) { // complexa
            queryString = "select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P\n" +
                "inner join Producatori Pr on P.id_producator = Pr.id \n" +
                "inner join Distribuitori D on P.id_distribuitor = D.id\n" +
                "where p.id in (select app.id_produs from angajati_preluare_produse app where app.id_produs = p.id and app.data_intrare > '" + valoare + "')";
        }
        
        if (parametru.toLowerCase().equals("price")) { // -> simpla ; produse mai scumpe de ...
            queryString = "select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P\n" +
                "inner join Producatori Pr on P.id_producator = Pr.id \n" +
                "inner join Distribuitori D on P.id_distribuitor = D.id\n" +
                "where P.pret > '" + valoare + "'";
        }
        
        if (parametru.toLowerCase().equals("producator")) { // -> simpla; produse de la producatorul ...
            queryString = "select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P\n" +
                "inner join Producatori Pr on P.id_producator = Pr.id and Pr.cui = '" + valoare + "'\n" +
                "inner join Distribuitori D on P.id_distribuitor = D.id";
        }
        
        if (parametru.toLowerCase().equals("distribuitor")) { // ->  simpla; produse de la distribuitorul ...
            queryString = "select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P\n" +
                "inner join Producatori Pr on P.id_producator = Pr.id \n" +
                "inner join Distribuitori D on P.id_distribuitor = D.id and D.cui = '" + valoare + "'";
        }

        System.out.println("Query: " + queryString);
        
        List<Map<String, Object>> result = jdbcTemplate.queryForList(queryString);
        
        for (Map<String, Object> produsSql : result ) {
            
            ProdusModel produs = new ProdusModel();
            
            produs.setId(produsSql.get("id").toString());
            produs.setModel(produsSql.get("model").toString());
            produs.setDescriere(produsSql.get("descriere").toString());
            produs.setPret(produsSql.get("pret").toString());
            produs.setPoza(produsSql.get("poza").toString());    
            produs.setStoc(produsSql.get("stoc").toString());
            produs.setDenumireProducator(produsSql.get("denprod").toString());
            produs.setDenumireDistribuitor(produsSql.get("dendis").toString());

            produse.add(produs);
        }
        
        System.out.println("Rezultat query: " + result);
        
        return ResponseEntity.ok( produse );
    }    
}



/*
        
        filtrare produse preluate de angajatul
        select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P
        inner join Producatori Pr on P.id_producator = Pr.id 
        inner join Distribuitori D on P.id_distribuitor = D.id
        inner join angajati a
        on a.id in (select app.id_angajat from angajati_preluare_produse app where app.id_produs = p.id and a.nume = 'nume')
        group by p.id, a.id, d.denumire, pr.denumire
        */
        
        /* 
        
        filtrare produse intrate in depozit intre datele x, y 
        "select * from produse p 
        where p.id in (select app.id_produs from angajati_preluare_produse app where app.id_produs = p.id and app.data_intrare > 'x' and app.data_intrare < 'y')"
        */
        
        /* 
        
        filtrare produse cu pret sub/peste x lei
        select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P
        inner join Producatori Pr on P.id_producator = Pr.id 
        inner join Distribuitori D on P.id_distribuitor = D.id
        where P.pret < x / where P.pret > x
        */
               
        /* 
        
        filtrare produse de la producatorul x -> x = cui
        select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P
        inner join Producatori Pr on P.id_producator = Pr.id and Pr.cui = 'x'
        inner join Distribuitori D on P.id_distribuitor = D.id
        */
        
        /* 
        
        filtrare produse de la distribuitorul x -> x = cui
        select P.*, D.denumire as dendis, Pr.denumire as denprod from produse P
        inner join Producatori Pr on P.id_producator = Pr.id 
        inner join Distribuitori D on P.id_distribuitor = D.id and D.cui = 'x'        
        */
        
        /* 
        
        afisare documente -> 
        select app.document_intrare, app.data_intrare, A.nume, P.model from angajati_preluare_produse app
        inner join Angajati A on A.id = app.id_angajat
        inner join Produse P on P.id = app.id_produs
        */