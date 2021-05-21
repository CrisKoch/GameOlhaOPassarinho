package com.kochmann;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, Integer> {

	@Query(value= "select * from ranking r where r.nivel = ? order by r.pontos desc limit 5", nativeQuery = true)
	List<Ranking> FindAllAndSort(String nivel);
	
	

}


