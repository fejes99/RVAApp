package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Klijent;
import rva.jpa.Racun;
import rva.repository.KlijentRepository;
import rva.repository.RacunRepository;

@CrossOrigin
@RestController
@Api(tags = {"Racun CRUD operacije"})
public class RacunRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@GetMapping("/racun")
	@ApiOperation(value = "Vraća kolekciju svih računa iz baze podataka")
	public Collection<Racun> getRacuni() {
		return racunRepository.findAll();
	}
	
	@GetMapping("/racun/{id}")
	@ApiOperation(value = "Vraća račun iz baze podataka čiji je ID vrednost prosleđena kao path variabla")
	public Racun getRacun(@PathVariable("id") Integer id) {
		return racunRepository.getOne(id);
	}
	
	@GetMapping("/racunNaziv/{naziv}")
	@ApiOperation(value = "Vraća račun iz baze podataka čiji je NAZIV vrednost prosleđena kao path variabla")
	public Collection<Racun> getRacunByNaziv(@PathVariable("naziv") String naziv) {
		return racunRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@GetMapping("/racunKlijenti/{id}")
	@ApiOperation(value = "Vraća račun iz baze podataka čiji je KLIJENT ID vrednost prosleđena kao path variabla")
	public Collection<Racun> getRacunByKlijentID(@PathVariable("id") Integer id) {
		Klijent klijent = klijentRepository.getOne(id);
		return racunRepository.findByKlijent(klijent);
	}
	
	@PostMapping("racun") 
	@ApiOperation(value = "Upisuje račun u bazu podataka")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK);
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);	
	}
	
	@PutMapping("racun")
	@ApiOperation(value = "Modifikuje postojeći račun u bazi podataka")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId())) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
		
	}
	
	@DeleteMapping("racun/{id}")
	@ApiOperation(value = "Briše račun iz baze podataka čiji je ID vrednost prosleđena kao path variabla")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id) {
		if(!racunRepository.existsById(id)) {
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);
		}
		racunRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"racun\" (\"id\", \"naziv\", \"oznaka\", \"opis\", \"tip_racuna\", \"klijent\") "
					+ "VALUES (-100, 'Test racun', 'Dinarski racun', 'Dinarski racun za Pravno lice', 4, 2)"
			);
		}
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
}
