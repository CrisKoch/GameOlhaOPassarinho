package com.kochmann;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
@Autowired
UsuarioRepository repositorio;
	
	@GetMapping("/usuarios")
	public List<Usuario> todos(){
		return repositorio.findAll();	}
	
	@PostMapping
	public Usuario novo(@RequestBody Usuario usuario) {
		 return repositorio.save(usuario);
	}
	
}
