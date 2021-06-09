package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Klijent;

public interface KlijentRepository extends JpaRepository<Klijent, Integer> {
	
	Collection<Klijent> findByPrezimeContainingIgnoreCase(String prezime);
}

